import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

/** Derive browser GitHub repo URL from a raw.githubusercontent.com README link. */
export function readmeRawToRepoUrl(rawReadmeUrl: string): string {
  const u = new URL(rawReadmeUrl);
  const segments = u.pathname.split("/").filter(Boolean);
  const user = segments[0];
  const repo = segments[1];
  return `https://github.com/${user}/${repo}`;
}

/** Fetch README markdown from GitHub raw, render to sanitized HTML (build time). */
export async function fetchReadmeHtml(rawReadmeUrl: string): Promise<string> {
  const res = await fetch(rawReadmeUrl);
  if (!res.ok) {
    throw new Error(`README fetch failed (${res.status})`);
  }
  const md = await res.text();
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
