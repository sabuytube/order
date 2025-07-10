/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  webpack(config) {
    config.resolve.alias['@'] = __dirname + '/src';
    return config;
  }
};

module.exports = nextConfig;
