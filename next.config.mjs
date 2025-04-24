/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: {
        // bump the limit from 1 MB to 10 MB
        bodySizeLimit: '10mb',
      },
    },
  };
  
  export default nextConfig;
  