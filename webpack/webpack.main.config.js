/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const { DefinePlugin } = require("webpack");
const merge = require("webpack-merge");

const getRootDir = require("./getRootDir");
const { baseConfig, getBabelRule } = require("./webpack.base.config");

const root = getRootDir();

module.exports = merge.smart(baseConfig, {
  target: "electron-main",
  entry: {
    main: `${root}/src/main/main.ts`,
    preload: `${root}/src/main/preload.ts`,
  },
  output: {
    path: `${root}/dist/main`,
    filename: "[name].js",
  },
  module: {
    rules: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development",
      ),
    }),
  ],
});
