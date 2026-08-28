import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://countycargo.com';

  const routes = [
    '',
    '/about',
    '/contact',
    '/faq',
    '/info',
    '/shipping-from-uk-to-nigeria',
    '/express-shipping-uk-to-nigeria',
    '/ship-cargo-uk-to-nigeria',
    '/ship-from-us-to-nigeria',
    '/ship-from-nigeria-to-uk',
    '/ship-from-nigeria-to-us',
    '/ship-from-nigeria-to-world',
    '/uk-stores',
    '/us-stores',
    '/blog',
    '/blog/door-to-door-shipping-from-uk-and-usa-to-nigeria-guide',
    '/blog/shipping-from-uk-and-usa-to-nigeria-avoid-delays',
    '/blog/shipping-industry-nigeria-2026',
    '/blog/nigeria-cargo-update-august-2026',
    '/blog/ai-in-warehouse-management',
    '/blog/sustainable-logistics-practices',
    '/blog/transportation-market-from-nigeria',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));
}
