/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode and concurrent rendering features. These are
  // necessary for Suspense boundaries to work correctly.
  reactStrictMode: true,

  experimental: {
    // Ensure the app router and streaming features remain enabled.
    appDir: true,
    serverActions: true,
  },

  webpack(config) {
    // Give dynamic imports a deterministic chunk name so they can be cached
    // and loaded immediately on navigation.
    config.output.chunkFilename = 'static/chunks/[name].[contenthash].js';
    return config;
  },
};

export default nextConfig;
