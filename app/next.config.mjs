/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "unpkg.com",
      },
    ],
  },
};

module.exports = nextConfig;
