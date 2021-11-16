const secrets = ["AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY", "GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "MONGODB_URI", "HTTPS_PRIVKEY", "HTTPS_CERT", "HTTPS_CHAIN", "SESSION_SECRET"];

export default function printSecrets() { secrets.forEach((secret) => console.log(`${secret} = ${process.env[secret]}`)); }
