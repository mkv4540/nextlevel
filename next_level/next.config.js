/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enables React Strict Mode
  experimental: {
    esmExternals: true, // Ensure ES modules like Swiper work properly
  },
};

module.exports = nextConfig;
