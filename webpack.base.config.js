const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { DefinePlugin } = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const crypto = require("crypto");

module.exports = {
  mode: "development",
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
    new CleanWebpackPlugin(),
    new DefinePlugin({
      __NONCE__: JSON.stringify('crypto.randomBytes(16).toString("base64")'),
    }),
  ],
};
