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
      key: "deploy.key",
      ref: "origin/main",
      repo: "git@github.com:ktminks/KGT.git",
      path: "/home/ktkat/KGT/back-end",
      "post-deploy":
        "cd ~/KGT/back-end && rsync -a -I ~/KGT/back-end/back-end/ ~/KGT/back-end && yes | rm -rI back-end front-end README.md && npm install && npm run restart && pm2 save",
      env: {
        NODE_ENV: "production",
      },
    },
  },
};
