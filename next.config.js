module.exports = {
  output: 'standalone',
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    env: {
        HOST:"http://nyp-zhixuan.us-east-1.elasticbeanstalk.com:8080"
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
