/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'via.placeholder.com' },
      // Azure Blob Storage (upload do admin)
      { protocol: 'https', hostname: '*.blob.core.windows.net' },
    ],
  },
};

export default nextConfig;
