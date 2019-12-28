const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { DefinePlugin } = require("webpack");
// const crypto = require("crypto");

module.exports = {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
    plugins: [new TsconfigPathsPlugin()],
  },
  devtool: "source-map",
  plugins: [
    new DefinePlugin({
      __NONCE__: JSON.stringify('crypto.randomBytes(16).toString("base64")'),
    }),
  ],
};
