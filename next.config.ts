import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/tinhdiem',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
