const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { DefinePlugin, SourceMapDevToolPlugin } = require("webpack");
const { resolve } = require("path");
const globalConstants = require("./globalConstants");
const getIsDevelopment = require("./getIsDevelopment");

const root = resolve(__dirname, "..");

const isDevelopment = getIsDevelopment();

module.exports = {
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
  devtool: false,
  plugins: [
    new DefinePlugin({
      ...globalConstants,
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development",
      ),
    }),
    /**
     * Electron drops the `preload.js` file into the browser before launching
     * the app. And it ends up looking for preload.js.map inside
     * artifacts/webpack/renderer and cannot find it. To solve that we
     * disable source map generation for the preload process, for now.
     */
    new SourceMapDevToolPlugin({
      exclude: ["preload.js"],
    }),
  ],
};
