/** @type {import('next').NextConfig} */
// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });
const nextConfig = {
  // env: {
  //   NEXT_PUBLIC_ENV: "PRODUCTION",
  // },
  experimental: {
    mdxRs: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "http",
        hostname: "*",
      },
    ],
  },
};

module.exports = nextConfig;
