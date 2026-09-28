import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Old legal URLs (German and the separate English pages) → the one legal page.
  async redirects() {
    const to = (source: string, id: string) => ({ source, destination: `/legal#${id}`, permanent: true });
    return [
      to("/impressum", "legal-notice"),
      to("/legal-notice", "legal-notice"),
      to("/datenschutz", "privacy"),
      to("/privacy", "privacy"),
      to("/agb", "terms"),
      to("/terms", "terms"),
      to("/widerruf", "withdrawal"),
      to("/withdrawal", "withdrawal"),
    ];
  },
};

export default nextConfig;
