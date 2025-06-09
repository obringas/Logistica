/** @type {import('next').NextConfig} */
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';
const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
const basePath = '/StockLogistica';

const nextConfig = {
  output: 'standalone',
  basePath: basePath,
  assetPrefix: basePath, // 🟢 NECESARIO para servir correctamente estáticos en subruta

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
        },
      ];
    }
    return [];
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};

module.exports = nextConfig;
