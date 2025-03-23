/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Increase memory limit to avoid stack overflow
    serverComponentsExternalPackages: [],
  },
  // Increase memory limit for Node.js
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.optimization.nodeEnv = "production"
    }

    // Increase memory limit
    config.performance = {
      ...config.performance,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    }

    return config
  },
}

module.exports = nextConfig

