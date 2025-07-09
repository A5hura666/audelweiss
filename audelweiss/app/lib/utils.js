export function getStrapiURL() {
    return process.env.STRAPI_BASE_URL ?? 'http://localhost:1337';
}

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://ayun.myddns.me:5000";

export const getStrapiCall = (path) => `${API_URL}${path}`;