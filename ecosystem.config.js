module.exports = {
  apps : [{
    script: 'npm start',
  }],

  deploy : {
    production : {
      key:'nginx.pem',
      user : 'bitnami',
      host : '13.229.104.127',
      ref  : 'origin/dev',
      repo : 'git@github.com:Wangzizii/Nextjs.git',
      path : '/home/bitnami',
      'pre-deploy-local': '',
      'post-deploy' : 'source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh-options':'ForwardAgent=yes'
    }
  }
};
