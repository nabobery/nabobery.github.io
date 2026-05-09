import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
      authors: z.array(z.string()).optional(),
      tags: z.array(z.string()).optional(),
      categories: z.array(z.string()).optional(),
      externalLink: z.url().optional(),
      series: z.array(z.string()).optional(),
    }),
});

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      pubDate: z.coerce.date(),
      authors: z.array(z.string()).optional(),
      tags: z.array(z.string()).optional(),
      categories: z.array(z.string()).optional(),
      /** If set, README is fetched at build time from GitHub raw URL. */
      readmeUrl: z.url().optional(),
    }),
});

export const collections = { blog, projects };
