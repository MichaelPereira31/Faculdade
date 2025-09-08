import type { Configuration as WebpackConfig } from "webpack";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["localhost"],
  },
  webpack: (config: WebpackConfig) => {
    config.ignoreWarnings = [{ module: /generated/ }, { module: /prisma/ }];
    return config;
  },
};

export default nextConfig;
