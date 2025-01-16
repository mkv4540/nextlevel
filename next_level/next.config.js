/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enables React Strict Mode
  experimental: {
    esmExternals: true,
    
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['img.youtube.com'], // Add the allowed domain here
  },
};

module.exports = nextConfig;
