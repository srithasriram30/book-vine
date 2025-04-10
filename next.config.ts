import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['covers.openlibrary.org']
  },
  crossOrigin: 'anonymous'
};

export default nextConfig;
