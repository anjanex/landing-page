/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://anjanex.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/private'],
      },
      {
        userAgent: 'AdsBot-Google',
        allow: '/',
      },
    ],
  },
  exclude: [
    '/admin',
    '/private',
    '/404',
    '/500',
    '/sitemap.xml',
    '/robots.txt',
  ],
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
};

module.exports = config;
