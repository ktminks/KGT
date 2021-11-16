// https://aws.amazon.com/developers/getting-started/nodejs/
import AWS from "aws-sdk";
import dotenv from "dotenv";
import path from "path";
import { writeFileSync } from "fs";

// const overwriteEnv = (envSecrets) => {
//   const keys = Object.keys(envSecrets);
//   keys.forEach((key) => {
//     process.env[key] = envSecrets[key] || "";
//     // console.log(key);
//     // console.log(process.env[key]);
//     // console.log(envSecrets[key]);
//   });
// };

export default function getSecrets() {
  const envFilePath = path.resolve(process.cwd(), ".env");

  // Load the AWS SDK
  const region = "us-east-1";
  const secretName = "arn:aws:secretsmanager:us-east-1:470624414136:secret:KGT_backend_secrets-6FzySI";

  // Create a Secrets Manager client
  const client = new AWS.SecretsManager({ region });
  console.log(client.config.credentials);

  // In this sample we only handle the specific exceptions for the 'GetSecretValue' API.
  // See https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
  // We rethrow the exception by default.

  client.getSecretValue({ SecretId: secretName }, (err, data) => {
    if (err) {
      if (err.code === "DecryptionFailureException") throw err;
      // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
      else if (err.code === "InternalServiceErrorException") throw err;
      // An error occurred on the server side.
      else if (err.code === "InvalidParameterException") throw err;
      // You provided an invalid value for a parameter.
      else if (err.code === "InvalidRequestException") throw err;
      // You provided a parameter value that is not valid for the current state of the resource.
      else if (err.code === "ResourceNotFoundException") throw err;
      // We can't find the resource that you asked for.
      else if (!data) return;
    }
    // Decrypts secret using the associated KMS CMK.
    // Depending on whether the secret is a string or binary, one of these fields will be populated.
    let secrets;
    if ("SecretString" in data) secrets = data.SecretString;
    else secrets = Buffer.from(data.SecretBinary, "base64").toString("ascii");
    const envSecrets = JSON.parse(secrets);
    const keys = Object.keys(envSecrets);
    let envKeys = "";
    keys.forEach((key) => (envKeys += `${key}="${envSecrets[key]}"\n`));
    writeFileSync(".env", Buffer.from(envKeys), (oopsie) => { console.error(oopsie); });

    const result = dotenv.config({ path: envFilePath });
    if (result.error) throw result.error;
    else console.log("ENV set from AWS secrets");
    // overwriteEnv(envSecrets);
    // console.log(process.env);
  });
}
