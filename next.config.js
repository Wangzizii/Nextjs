module.exports = {
  reactStrictMode: false,
  output: 'standalone',
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    env: {
        // HOST:"http://ec2-47-129-158-47.ap-southeast-1.compute.amazonaws.com:8080"
        HOST:"http://localhost:8080"
      },
      async redirects() {
        return [
            {
                source: '/',
                destination: '/login',
                permanent: true,
            },
        ];
    },
  }
