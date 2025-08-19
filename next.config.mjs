/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Replit-specific optimizations
  experimental: {
    // Remove deprecated option
  },
  // Ensure proper SSR
  output: 'standalone',
  // Disable telemetry (moved to separate config)
  // telemetry: false,
  // Optimize for Replit environment
  poweredByHeader: false,
  compress: true,
}

export default nextConfig
