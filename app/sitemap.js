export default function sitemap() {
  const baseUrl = 'https://palmbay.digital';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ];
}
