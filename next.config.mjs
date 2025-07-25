/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    appDir: true,
    serverActions: true,
  },

  webpack(config) {
    config.output.chunkFilename = "static/chunks/[name].[contenthash].js";
    return config;
  },
};

export default nextConfig;
