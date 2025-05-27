/** @type {import('next').NextConfig} */

// Detectamos si estamos en modo desarrollo
const isDev = process.env.NODE_ENV === 'development';
const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
const basePath = '/StockLogistica';

const nextConfig = {
  ...(isDev ? {} : { output: 'export' }),

  basePath: basePath,

  async rewrites() {
    if (isDev) {
      return [
        {
          source: `${basePath}/api/:path*`,
          destination: `${apiUrl}/:path*`,
        },
        {
          source: `/api/:path*`,
          destination: `${apiUrl}/:path*`,
        }
      ];
    }
    return [];
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
