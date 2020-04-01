const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { DefinePlugin } = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const globalConstants = require("./globalConstants");
const getIsDevelopment = require("./getIsDevelopment");

const root = require("./getRootDir")();

const isDevelopment = getIsDevelopment();

exports.baseConfig = {
  mode: isDevelopment ? "development" : "production",
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
          configFile: `${root}/babel.config.js`,
        },
      },
    ],
  },
  devtool: "source-map",
  plugins: [new CleanWebpackPlugin(), new DefinePlugin(globalConstants)],
};
