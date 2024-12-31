/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enables React Strict Mode
  experimental: {
    esmExternals: true,
    
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
