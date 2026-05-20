import type { NextConfig } from "next";

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/tinhdiem',
  images: {
    unoptimized: true,
  },
  // Setting empty object as per TIP in the error message
  // @ts-ignore
  turbopack: {},
};

module.exports = withPWA(nextConfig);
