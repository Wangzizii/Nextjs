/** @type {import('next').NextConfig} */

const nextConfig = {
    output: "standalone",
    async redirects() {
        return [
            {
                source: '/',
                destination: '/login',
                permanent: true,
            },
        ];
    },

};




export default nextConfig;
