import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Old German legal URLs → English ones.
  async redirects() {
    return [
      { source: "/impressum", destination: "/legal-notice", permanent: true },
      { source: "/datenschutz", destination: "/privacy", permanent: true },
      { source: "/agb", destination: "/terms", permanent: true },
      { source: "/widerruf", destination: "/withdrawal", permanent: true },
    ];
  },
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
