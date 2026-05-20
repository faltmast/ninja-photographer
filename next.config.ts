import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "format.creatorcdn.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
