export default function checkMode() {
  return process.env.MODE ? process.env.MODE : "development";
}
