/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  
  images: { unoptimized: true },
  trailingSlash: true,
  distDir: 'out',
  
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  
  experimental: {
    optimizePackageImports: ['@react-three/fiber', '@react-three/drei'],
  },
};

module.exports = nextConfig;