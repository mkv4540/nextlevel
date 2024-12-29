/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enables React Strict Mode
  experimental: {
    esmExternals: true,
    appDir: true // Ensure ES modules like Swiper work properly
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
