import siteMapConfig from './next-sitemap.config.js';

const nextConfig = {
  ...siteMapConfig,
  experimental: {
    logging: {
      level: 'error',
    },
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000' 
          },
          { key: 'Access-Control-Allow-Methods', value: 'GET, OPTIONS, POST, PUT, DELETE' }, 
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Content-Disposition, Authorization' }, 
          { key: 'Vary', value: 'Origin' },
        ],
      },
    ];
  },
};

export default nextConfig;
