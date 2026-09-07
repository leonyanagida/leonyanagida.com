/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: process.env.NEXT_BUILD_DIR || '.next',
};

export default nextConfig;
