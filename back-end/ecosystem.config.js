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
    },
  ],
  deploy: {
    production: {
      user: "username",
      host: "52-0-165-153",
      key: "deploy.key",
      ref: "origin/main",
      repo: "https://github.com/ktminks/kgt",
      path: "/home/ktkat/KGT/back-end",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production && pm2 save",
    },
  },
};
