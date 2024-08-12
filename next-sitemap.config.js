const fs = require('fs');
const path = require('path');

const dynamicPaths = JSON.parse(fs.readFileSync(path.join(__dirname, 'app/data/sitemap/data.json'), 'utf8'));

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'daily',
  priority: 1.0,
  sitemapName: 'sitemap.xml',
  robotsTxtOptions: {
    policies: [
      { userAgent: 'Googlebot', allow: '/', disallow: '/admin/*' },
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/admin/*' },
    ],
  },
  defaultLocale: 'en',
  locales: ['en', 'fr', 'es'],
  additionalPaths: async (config) => {
    return dynamicPaths.map(p => ({
      loc: p,
      changefreq: 'daily',
      priority: 1.0,
      lastmod: new Date().toISOString(),
    }));
  },
};
