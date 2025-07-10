// File: src/app/sitemap.xml/route.ts
import { NextResponse } from 'next/server';

const BASE_URL = 'https://harmonious-surprise-60a0828505.strapiapp.com/api';

export async function GET() {
  const endpoints = [
    {
      url: 'https://harmonious-surprise-60a0828505.strapiapp.com/api/articles?fields=slug&pagination[pageSize]=100',
      prefix: '/article/',
    },
    {
      url: 'https://harmonious-surprise-60a0828505.strapiapp.com/api/authors?fields=slug&pagination[pageSize]=100',
      prefix: '/authors/',
    },
    {
      url: 'https://harmonious-surprise-60a0828505.strapiapp.com/api/categories?fields=slug&pagination[pageSize]=100',
      prefix: '/categories/',
    },
  ];

  let routes: string[] = [];

  for (const { url, prefix } of endpoints) {
    const res = await fetch(url, { cache: 'no-store' });
    const json = await res.json();
    const slugs = json.data.map((item: any) => `${prefix}${item.slug}`);
    routes = [...routes, ...slugs];
  }

  // Add static pages
  const staticPages = ['', '/about', '/contact', '/news', '/career'];
  routes = [...routes, ...staticPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `<url>
  <loc>${BASE_URL}${route}</loc>
  <lastmod>${new Date().toISOString()}</lastmod>
</url>`
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
