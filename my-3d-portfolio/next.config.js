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
  basePath: '',
  assetPrefix: '',
  
  // Performance optimizations
  compress: true,
  
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  
  // Removed the problematic webpack three.js alias
  
  // Optimize package imports
  experimental: {
    optimizePackageImports: ['framer-motion', '@react-three/fiber', '@react-three/drei'],
  },
};

module.exports = nextConfig;