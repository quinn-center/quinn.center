import { getCollection } from 'astro:content';
import type { Post } from './site';

/** Every published post of both kinds, newest first. */
export async function allPosts(): Promise<Post[]> {
  const blog = await getCollection('blog', ({ data }) => !data.draft);
  const newsletter = await getCollection('newsletter', ({ data }) => !data.draft);
  const posts: Post[] = [
    ...blog.map((entry) => ({ kind: 'blog' as const, id: entry.id, url: `/blog/${entry.id}/`, ...pick(entry.data) })),
    ...newsletter.map((entry) => ({ kind: 'newsletter' as const, id: entry.id, url: `/newsletter/${entry.id}/`, ...pick(entry.data) })),
  ];
  return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
}

function pick(data: { title: string; date: Date; description: string }) {
  return { title: data.title, date: data.date, description: data.description };
}
