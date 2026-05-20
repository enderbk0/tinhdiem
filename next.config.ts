import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/tinhdiem',
  assetPrefix: '/tinhdiem',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
