/** @type {import('next').NextConfig} */
const nextConfig = {
    turbopack: {
        root: __dirname,
    },
    async rewrites() {
        return [
            {
                // Quando seu app client chamar /api/data/movimento...
                source: '/api/data/movimento',
                // O Next.js busca os dados direto no Render por baixo dos panos (sem CORS)
                destination: 'https://dashboard-pro-para-esp32.onrender.com/api/data/movimento',
            },
        ];
    },
};

export default nextConfig;