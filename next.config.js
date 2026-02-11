/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ['@phosphor-icons/react'],
  experimental: {
    optimizePackageImports: ['@phosphor-icons/react'],
  },
  images: {
    unoptimized: true,  // ← Add this line
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
}
module.exports = nextConfig