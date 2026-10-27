import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One schema for both kinds of post. A build fails on a missing or mistyped field,
// which is the point: a typo in frontmatter never reaches the site.
const post = z.object({
  title: z.string(),
  date: z.coerce.date(),
  description: z.string(),
  draft: z.boolean().default(false),
  author: z.string().optional(),
});

// Files whose name starts with an underscore (the _example.md templates) are not loaded.
const blog = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/blog' }),
  schema: post,
});

const newsletter = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/newsletter' }),
  schema: post,
});

export const collections = { blog, newsletter };
