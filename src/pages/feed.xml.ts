import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '../site';
import { allPosts } from '../posts';

export async function GET(context: APIContext) {
  const posts = await allPosts();
  return rss({
    title: site.fullName,
    description: site.description,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.title,
      pubDate: post.date,
      description: post.description,
      link: post.url,
      categories: [post.kind],
    })),
    customData: '<language>en-us</language>',
  });
}
