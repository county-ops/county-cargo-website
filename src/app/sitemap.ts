import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://countycargo.com';

  const homePage = [
    { route: '', priority: 1.0, changeFrequency: 'weekly' as const },
  ];

  const pillarPages = [
    { route: '/shipping-to-nigeria', priority: 0.95, changeFrequency: 'weekly' as const },
    { route: '/export-from-nigeria', priority: 0.95, changeFrequency: 'weekly' as const },
  ];

  const exportCountryPages = [
    '/shipping-from-nigeria-to-canada',
    '/shipping-from-nigeria-to-usa',
    '/shipping-from-nigeria-to-uk',
    '/shipping-from-nigeria-to-germany',
    '/shipping-from-nigeria-to-france',
    '/shipping-from-nigeria-to-turkey',
  ].map((route) => ({ route, priority: 0.9, changeFrequency: 'monthly' as const }));

  const servicePages = [
    '/shipping-from-uk-to-nigeria',
    '/ship-from-us-to-nigeria',
    '/ship-from-nigeria-to-uk',
    '/ship-from-nigeria-to-us',
    '/ship-from-nigeria-to-world',
    '/shipping-from-london-to-nigeria',
    '/uk-stores',
    '/us-stores',
  ].map((route) => ({ route, priority: 0.9, changeFrequency: 'monthly' as const }));

  const regionalPages = [
    '/shipping-barrels-from-uk-to-nigeria',
    '/shipping-barrels-from-the-usa-to-nigeria',
    '/shipping-barrels-from-chicago-to-nigeria',
    '/shipping-from-liverpool-to-nigeria',
    '/shipping-from-london-to-nigeria',
    '/shipping-from-manchester-to-nigeria',
    '/shipping-from-birmingham-to-nigeria',
    '/shipping-from-leeds-to-nigeria',
    '/shipping-from-preston-to-nigeria',
    '/shipping-from-bolton-to-nigeria',
    '/shipping-from-warrington-to-nigeria',
    '/shipping-to-lagos',
    '/shipping-to-abuja',
    '/shipping-to-kaduna',
    '/shipping-to-kano',
  ].map((route) => ({ route, priority: 0.85, changeFrequency: 'monthly' as const }));

  const coreSitePages = [
    '/about',
    '/contact',
    '/faq',
    '/info',
  ].map((route) => ({ route, priority: 0.8, changeFrequency: 'monthly' as const }));

  const blogIndex = [
    { route: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
  ];

  const blogPosts = [
    '/blog/uk-usa-nigeria-cargo-update-september-2026',
    '/blog/free-delivery-to-abuja',
    '/blog/shipping-from-london-to-lagos',
    '/blog/shipping-from-london-to-abuja',
    '/blog/shipping-from-london-to-kano',
    '/blog/shipping-cost-from-nigeria-to-canada',
    '/blog/customs-documents-shipping-nigeria-to-canada',
    '/blog/permitted-prohibited-items-nigeria-to-canada',
    '/blog/complete-guide-shipping-cargo-nigeria-to-usa',
    '/blog/nigeria-to-usa-air-cargo-cost-delivery-time',
    '/blog/how-to-send-food-personal-belongings-nigeria-to-america',
    '/blog/complete-guide-shipping-from-nigeria-to-uk',
    '/blog/cargo-cost-from-nigeria-to-uk',
    '/blog/uk-customs-packaging-restricted-items-explained',
    '/blog/how-to-ship-goods-from-nigeria-to-germany',
    '/blog/german-customs-requirements-cargo-from-nigeria',
    '/blog/air-freight-nigeria-to-germany-cost-delivery',
    '/blog/complete-guide-shipping-from-nigeria-to-france',
    '/blog/documents-required-export-goods-nigeria-to-france',
    '/blog/sending-food-clothing-personal-belongings-to-france',
    '/blog/complete-guide-shipping-cargo-nigeria-to-turkey',
    '/blog/nigeria-to-turkey-air-freight-cost-customs-guide',
    '/blog/permitted-restricted-items-shipping-to-turkey',
    '/blog/nigeria-customs-clearance-guide',
    '/blog/shipping-electronics-uk-to-nigeria',
    '/blog/shipping-personal-belongings-to-nigeria',
    '/blog/shipping-commercial-goods-to-nigeria',
    '/blog/air-freight-vs-sea-freight-to-nigeria',
    '/blog/cargo-shipping-cost-to-nigeria',
    '/blog/how-to-calculate-volumetric-weight',
    '/blog/uk-to-nigeria-shipping-time',
    '/blog/prohibited-items-shipping-to-nigeria',
    '/blog/how-to-package-cargo-for-nigeria',
    '/blog/shipping-from-usa-texas-to-nigeria',
    '/blog/door-to-door-cargo-delivery-nigeria',
    '/blog/nigeria-cargo-update-what-uk-and-us-shippers-need-to-know-today',
    '/blog/shipping-from-nigeria-to-the-uk-reliable-cargo-and-freight-solutions',
    '/blog/shipping-from-nigeria-to-the-us-reliable-cargo-and-freight-solutions',
    '/blog/door-to-door-shipping-from-nigeria-to-the-world',
    '/blog/documents-required-for-exporting-goods-from-nigeria',
    '/blog/nigeria-to-uk-air-freight-explained',
    '/blog/sending-food-products-from-nigeria-to-the-uk',
    '/blog/shipping-personal-belongings-from-nigeria-to-the-uk',
    '/blog/how-to-ship-from-the-uk-to-nigeria',
    '/blog/liverpool-to-lagos-cargo-services',
    '/blog/liverpool-to-abuja-cargo-services',
    '/blog/ai-in-warehouse-management',
    '/blog/sustainable-logistics-practices',
    '/blog/transportation-market-from-nigeria',
  ].map((route) => ({ route, priority: 0.8, changeFrequency: 'monthly' as const }));

  const allPages = [
    ...homePage,
    ...pillarPages,
    ...exportCountryPages,
    ...servicePages,
    ...regionalPages,
    ...coreSitePages,
    ...blogIndex,
    ...blogPosts,
  ];

  return allPages.map(({ route, priority, changeFrequency }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
