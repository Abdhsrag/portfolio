/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: [],
  },
  trailingSlash: true,
  distDir: 'out',
  
  // Optional: if you have issues with paths
  basePath: '',
  assetPrefix: '',
};

module.exports = nextConfig;
