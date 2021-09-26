module.exports = {
  apps: [
    {
      name: "kgt-api",
      script: "npm run deploy",
      time: true,
      instances: 1,
      autorestart: true,
      max_restarts: 50,
      watch: false,
      max_memory_restart: "1G",
      env: {
        PORT: 4000,
        KGT_USER: "KGT_USER",
        KGT_HOST: "KGT_HOST",
      },
    },
  ],
  deploy: {
    production: {
      user: "KGT_USER",
      host: "KGT_HOST",
      key: "~/.ssh/deploy.key",
      ref: "origin/main",
      repo: "https://github.com/ktminks/kgt",
      path: "/home/ktkat/KGT/back-end",
      // "pre-deploy-local":
      //   'echo "is it possible to navigate to back-end here?" cd back-end',
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production && pm2 save",
      env: {
        NODE_ENV: "production",
        KGT_USER: "KGT_USER",
        KGT_HOST: "KGT_HOST",
      },
    },
  },
};
