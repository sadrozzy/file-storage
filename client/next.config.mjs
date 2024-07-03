/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: [process.env.API_URL], // Добавьте здесь домены, откуда загружаются изображения
    },
};

export default nextConfig;
