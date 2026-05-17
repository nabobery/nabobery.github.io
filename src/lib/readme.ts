import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

const README_FETCH_TIMEOUT_MS = 10_000;

/** Remove first ATX H1 so project page title from layout stays the only top-level heading. */
export function stripLeadingReadmeH1(md: string): string {
  const normalized = md.replace(/^\uFEFF/, "");
  const lines = normalized.split(/\r?\n/);
  if (lines.length === 0) {
    return md;
  }
  const first = lines[0];
  if (!/^#\s+.+\s*$/.test(first)) {
    return md;
  }
  const rest = lines
    .slice(1)
    .join("\n")
    .replace(/^\s*\n+/, "");
  return rest;
}

/** Derive browser GitHub repo URL from a raw.githubusercontent.com README link. */
export function readmeRawToRepoUrl(rawReadmeUrl: string): string {
  let url: URL;
  try {
    url = new URL(rawReadmeUrl);
  } catch {
    throw new Error(`Invalid README URL: ${rawReadmeUrl}`);
  }
  if (url.hostname !== "raw.githubusercontent.com") {
    throw new Error(`Expected raw.githubusercontent.com URL: ${rawReadmeUrl}`);
  }
  const segments = url.pathname.split("/").filter(Boolean);
  if (segments.length < 2) {
    throw new Error(`Invalid GitHub raw path (need user/repo): ${rawReadmeUrl}`);
  }
  const user = segments[0];
  const repo = segments[1];
  if (!user?.trim() || !repo?.trim()) {
    throw new Error(`Invalid GitHub raw URL (missing user/repo): ${rawReadmeUrl}`);
  }
  return `https://github.com/${user}/${repo}`;
}

/** Fetch README markdown from GitHub raw, render to sanitized HTML (build time). */
export async function fetchReadmeHtml(rawReadmeUrl: string): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, README_FETCH_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(rawReadmeUrl, { signal: controller.signal });
  } catch (err) {
    clearTimeout(timeoutId);
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`README fetch timed out: ${rawReadmeUrl}`);
    }
    throw err;
  }
  clearTimeout(timeoutId);
  if (!res.ok) {
    throw new Error(`README fetch failed (${res.status})`);
  }
  const mdRaw = await res.text();
  const md = stripLeadingReadmeH1(mdRaw);
  const rawHtml = marked.parse(md, { gfm: true }) as string;
  return sanitizeHtml(rawHtml, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2", "h3", "pre", "code"]),
    allowedAttributes: {
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt", "title", "width", "height", "loading"],
      code: ["class"],
      pre: ["class"],
      span: ["class"],
      div: ["class"],
    },
    allowedSchemes: ["http", "https", "mailto"],
  });
}
