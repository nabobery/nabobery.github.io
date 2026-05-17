import type { CollectionEntry } from "astro:content";

/**
 * Normalize a tag label to a single URL path segment (legacy Hugo used lowercase segments like `programming`).
 */
export function tagToSlug(label: string): string {
  const trimmed = label.trim().normalize("NFKD").replace(/\p{M}/gu, "");
  const hyphenated = trimmed
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
  return hyphenated;
}

export type TagStat = {
  slug: string;
  displayLabel: string;
  blogCount: number;
  projectCount: number;
};

function pickBetterLabel(existing: string, incoming: string): string {
  if (incoming.length > existing.length) {
    return incoming;
  }
  return existing;
}

function slugSetFromEntry(entry: { data: { tags?: string[] } }): Set<string> {
  const set = new Set<string>();
  for (const raw of entry.data.tags ?? []) {
    const slug = tagToSlug(raw);
    if (slug) {
      set.add(slug);
    }
  }
  return set;
}

/**
 * Aggregate tag slugs across blog + projects with per-entry counts (one post contributes at most once per tag).
 */
export function buildTagIndexFromCollections(
  blogPosts: CollectionEntry<"blog">[],
  projects: CollectionEntry<"projects">[],
): Map<string, TagStat> {
  const map = new Map<string, TagStat>();

  for (const entry of [...blogPosts, ...projects]) {
    for (const raw of entry.data.tags ?? []) {
      const slug = tagToSlug(raw);
      if (!slug) {
        continue;
      }
      const trimmed = raw.trim();
      const existing = map.get(slug);
      if (!existing) {
        map.set(slug, {
          slug,
          displayLabel: trimmed,
          blogCount: 0,
          projectCount: 0,
        });
      } else {
        existing.displayLabel = pickBetterLabel(existing.displayLabel, trimmed);
      }
    }
  }

  for (const post of blogPosts) {
    for (const slug of slugSetFromEntry(post)) {
      map.get(slug)!.blogCount += 1;
    }
  }

  for (const project of projects) {
    for (const slug of slugSetFromEntry(project)) {
      map.get(slug)!.projectCount += 1;
    }
  }

  return map;
}

export function sortTagStats(stats: Iterable<TagStat>): TagStat[] {
  const arr = [...stats];
  arr.sort((a, b) => {
    const totalA = a.blogCount + a.projectCount;
    const totalB = b.blogCount + b.projectCount;
    if (totalB !== totalA) {
      return totalB - totalA;
    }
    const labelA = a.displayLabel.toLowerCase();
    const labelB = b.displayLabel.toLowerCase();
    if (labelA < labelB) {
      return -1;
    }
    if (labelA > labelB) {
      return 1;
    }
    return 0;
  });
  return arr;
}

/** Entries whose normalized tag slug set includes `slug`. */
export function entriesWithTagSlug<T extends { data: { tags?: string[] } }>(
  entries: T[],
  slug: string,
): T[] {
  return entries.filter((e) => slugSetFromEntry(e).has(slug));
}

export function sortByPubDateDesc<T extends { data: { pubDate: Date } }>(entries: T[]): T[] {
  return [...entries].sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
