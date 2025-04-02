export function getStrapiURL() {
    return process.env.STRAPI_BASE_URL ?? 'http://localhost:1337';
}

export function getStrapiCall(url) {
    return getStrapiURL() + url;
}