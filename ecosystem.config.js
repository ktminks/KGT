module.exports = {
  apps: [
    {
      name: "kgt-api",
      script: "npm run setup",
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
      user: "ktkat",
      host: "ec2-52-0-165-153.compute-1.amazonaws.com",
      key: "~/.ssh/deploy.key",
      ref: "origin/main",
      repo: "git@github.com:ktminks/KGT.git",
      path: "/home/ktkat/KGT/back-end",
      // "pre-deploy-local":
      //   'echo "is it possible to navigate to back-end here?" cd back-end',
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production && pm2 save",
      env: {
        NODE_ENV: "production",
      },
    },
  },
};
