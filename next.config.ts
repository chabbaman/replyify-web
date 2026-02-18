import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "workos.imgix.net" },
      { hostname: "workoscdn.com" },
    ],
  },
};

export default nextConfig;
