// https://aws.amazon.com/developers/getting-started/nodejs/
import AWS from "aws-sdk";
import dotenv from "dotenv";
import * as fs from "fs/promises";

export default async function getSecrets() {
  // check if env is already populated
  const envFilePath = "./.env";
  if (process.env.MONGODB_URI) {
    console.log("ENV already populated -- no need to hit AWS secrets");
    return;
  }

  // Load the AWS SDK
  const region = "us-east-1";
  const secretName = "arn:aws:secretsmanager:us-east-1:470624414136:secret:KGT_backend_secrets-6FzySI";

  // Create a Secrets Manager client
  const client = new AWS.SecretsManager({ region });
  let secrets;

  // In this sample we only handle the specific exceptions for the 'GetSecretValue' API.
  // See https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
  // We rethrow the exception by default.

  client.getSecretValue({ SecretId: secretName }, (err, data) => {
    if (err) {
      if (err.code === "DecryptionFailureException") {
      // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
      // Deal with the exception here, and/or rethrow at your discretion.
        throw err;
      } else if (err.code === "InternalServiceErrorException") {
      // An error occurred on the server side.
      // Deal with the exception here, and/or rethrow at your discretion.
        throw err;
      } else if (err.code === "InvalidParameterException") {
      // You provided an invalid value for a parameter.
      // Deal with the exception here, and/or rethrow at your discretion.
        throw err;
      } else if (err.code === "InvalidRequestException") {
      // You provided a parameter value that is not valid for the current state of the resource.
      // Deal with the exception here, and/or rethrow at your discretion.
        throw err;
      } else if (err.code === "ResourceNotFoundException") {
      // We can't find the resource that you asked for.
      // Deal with the exception here, and/or rethrow at your discretion.
        throw err;
      }
    } else if (!data) return;

    // Decrypts secret using the associated KMS CMK.
    // Depending on whether the secret is a string or binary, one of these fields will be populated.
    if ("SecretString" in data) secrets = data.SecretString;
    else secrets = Buffer.from(data.SecretBinary, "base64").toString("ascii");

    // console.log(secrets);
    fs.writeFile(envFilePath, secrets);
    console.log("ENV set from AWS secrets");
  });

  dotenv.config({ path: envFilePath });
}
