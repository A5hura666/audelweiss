/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
    env: {
        STRAPI_BASE_URL: process.env.STRAPI_BASE_URL,
    },
    images: {
        domains: ['flowbite.s3.amazonaws.com', 'ayun.myddns.me'],
    },
    webpack: (config, { isServer }) => {
        // Exclure nodemailer et ses dépendances du bundle client
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                net: false,
                tls: false,
                crypto: false,
                stream: false,
                url: false,
                zlib: false,
                http: false,
                https: false,
                assert: false,
                os: false,
                path: false,
                child_process: false,
            };
        }
        return config;
    },
};

export default nextConfig;
