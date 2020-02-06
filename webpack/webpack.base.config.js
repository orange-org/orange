const { compact } = require("lodash");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { DefinePlugin } = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { join } = require("path");
const globalConstants = require("./globalConstants");
// const crypto = require("crypto");

const root = require("./getRootDir")();

exports.baseConfig = {
  mode: "development",
  node: {
    __dirname: false,
    __filename: false,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          configFile: join(root, "babel.config.js"),
        },
      },
    ],
  },
  devtool: "source-map",
  plugins: [new CleanWebpackPlugin(), new DefinePlugin(globalConstants)],
};
