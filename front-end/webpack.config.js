const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: ["./src/index.jsx"],
  mode: "development",
  output: {
    filename: "kgt.bundle.js",
    path: path.resolve("dist"),
    publicPath: this.mode === "development" ? "http://localhost:4001" : "https://kgt.ktminks.com",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: ["babel-loader", "eslint-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new Dotenv(),
  ],
  devServer: {
    historyApiFallback: true,
    port: process.env.PORT ? Number(process.env.PORT) + 1 || 80 : 4001,
    hot: true,
    open: true,
    devMiddleware: { index: false },
    proxy: {
      "/api": {
        target: "http://localhost:4000/api",
        changeOrigin: true,
      },
    },
  },
  externals: {
    // global app config object
    config: JSON.stringify({
      apiUrl: "/api",
    }),
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
