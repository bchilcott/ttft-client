const dev = process.env.NODE_ENV !== 'production';

/** @type {import('next').NextConfig} */
const devConfig = {
  rewrites: async () => [
    {
      source: '/api/:path*',
      destination: 'http://localhost:8080/:path*',
    },
  ],
};

/** @type {import('next').NextConfig} */
const buildConfig = {
  output: 'export',
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  ...(dev ? devConfig : buildConfig),
};

module.exports = nextConfig;
