module.exports = {
  apps: [
    {
      name: "kgt-api",
      script: "npm run start",
      time: true,
      instances: 1,
      autorestart: true,
      max_restarts: 50,
      watch: false,
      max_memory_restart: "1G",
      env: {
        PORT: 4000,
      },
    },
  ],
  deploy: {
    production: {
      user: "USER",
      host: "HOST",
      key: "deploy.key",
      ref: "origin/main",
      repo: "https://github.com/ktminks/kgt",
      path: "/home/ktkat/KGT/back-end",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production && pm2 save",
    },
    env: {
      NODE_ENV: "production",
      USER: "KGT_USER",
      HOST: "KGT_HOST",
    },
  },
};
