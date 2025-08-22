/** @type {import('next').NextConfig} */
const nextConfig = {
     output: "export",
     trailingSlash: true,
     images: {
       unoptimized: true,
       remotePatterns: [
         {
           protocol: "https",
           hostname: "images.unsplash.com",
           port: "",
           pathname: "/**",
         },
       ],
     },
     reactStrictMode: true, 
};

export default nextConfig;
