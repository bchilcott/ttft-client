// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack');

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
  webpack: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('cesium'),
      })
    );
    return config;
  },
  ...(dev ? devConfig : buildConfig),
};

module.exports = nextConfig;
