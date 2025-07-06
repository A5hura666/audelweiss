/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
    env: {
        STRAPI_BASE_URL: process.env.STRAPI_BASE_URL,
    },
    images: {
        domains: ['flowbite.s3.amazonaws.com', 'ayun.myddns.me'],

    }
};

export default nextConfig;
