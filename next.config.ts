import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn11.bigcommerce.com",
      },
      {
        protocol: "https",
        hostname: "www.campervan-hq.com",
      },
      {
        protocol: "https",
        hostname: "nomadicsupply.com",
      },
      {
        protocol: "https",
        hostname: "tecvanlife.com",
      },
      {
        protocol: "https",
        hostname: "backlandgear.com",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "vantekglass.com",
      },
    ],
  },
};

export default nextConfig;
