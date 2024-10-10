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
      'post-setup':'eval `ssh-agent -s` && ssh-add /home/bitnami/id_rsa',
      'post-deploy' : 'source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': 'eval `ssh-agent -s` && ssh-add /home/bitnami/id_rsa',
      'ssh-options':'ForwardAgent=yes'
    }
  }
};
