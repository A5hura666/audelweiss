/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
    env: {
        STRAPI_BASE_URL: process.env.STRAPI_BASE_URL,
    },
};

export default nextConfig;
