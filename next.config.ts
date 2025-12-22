import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Optimize production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Enable compression
  compress: true,

  // Turbopack configuration (Next.js 16 uses Turbopack by default)
  turbopack: {},
};

export default nextConfig;
