/** @type {import('next').NextConfig} */

// Detectamos si estamos en modo desarrollo
const isDev = process.env.NODE_ENV === 'development';
//const isDev=true;
// Cargamos basePath y API URL desde variables de entorno
//const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
const basePath = '/StockLogistica'

const nextConfig = {
  // Solo hacemos 'export' en producción
  ...(isDev ? {} : { output: 'export' }),

  basePath: basePath,

  async rewrites() {
    if (isDev) {
      // En desarrollo, hacemos proxy para evitar CORS
      return [
        {
          source: "/api/:path*",
          destination: `${apiUrl}/:path*`,
        },
      ];
    }
    // En producción, no hacemos rewrites porque es exportado
    return [];
  },

  // Ignorar errores de eslint al hacer build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
