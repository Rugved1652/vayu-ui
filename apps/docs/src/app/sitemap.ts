import { source } from '@/lib/source';
import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vayu.design';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = source.getPages();
  
  const docsUrls = pages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: page.url === '/docs' ? 1 : 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...docsUrls,
  ];
}
