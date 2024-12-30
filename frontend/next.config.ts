import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "*",
        protocol: "http",
        port: "4000",
      },
      {
        hostname: "*",
        protocol: "https",
        port: "4000",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
