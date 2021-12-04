const path = require("path");
const Dotenv = require("dotenv-webpack");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  entry: ["./front-end/src/index.jsx"],
  mode: "development",
  output: {
    filename: "kgt.bundle.js",
    path: path.resolve("dist"),
    publicPath: "http://localhost:4001",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
            ],
            plugins: [
              "@babel/plugin-syntax-jsx",
              "@babel/plugin-transform-runtime",
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new ESLintPlugin({
      fix: true,
    }),
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
  experiments: {
    topLevelAwait: true,
  },
};
