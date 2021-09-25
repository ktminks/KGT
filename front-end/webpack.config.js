const HtmlWebpackPlugin = require("html-webpack-plugin");
const EnvironmentPlugin = require("node-env-webpack-plugin");

module.exports = {
  mode: "development",
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
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
    new EnvironmentPlugin(["NODE_ENV", this.mode]),
  ],
  devServer: {
    historyApiFallback: true,
    port: process.env.PORT ? Number(process.env.PORT) + 1 || 80 : 4001,
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
