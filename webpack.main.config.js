const { DefinePlugin } = require("webpack");
const merge = require("webpack-merge");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { join } = require("path");

const { baseConfig, getBabelRule } = require("./webpack.base.config");

module.exports = merge.smart(baseConfig, {
  target: "electron-main",
  entry: {
    main: join(__dirname, "src", "main", "main.ts"),
    preload: join(__dirname, "src", "main", "preload.ts"),
  },
  output: {
    path: join(__dirname, "dist", "main"),
    filename: "[name].js",
  },
  module: {
    rules: [
      getBabelRule(),
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      reportFiles: ["src/main/**/*"],
    }),
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development",
      ),
    }),
  ],
});
