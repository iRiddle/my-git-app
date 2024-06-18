/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          source: "/api/(.*)",
          headers: [
            {
              key: "Cache-Control",
              value: "no-store, max-age=0",
            },
            {
              key: "Pragma",
              value: "no-cache",
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  