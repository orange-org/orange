/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const { compact } = require("lodash");
const { IgnorePlugin } = require("webpack");
const merge = require("webpack-merge");
const CopyPlugin = require("copy-webpack-plugin");
const { resolve } = require("path");

const getIsDevelopment = require("./getIsDevelopment");
const baseConfig = require("./webpack.base.config");

const root = resolve(__dirname, "..");
const isDevelopment = getIsDevelopment();

module.exports = merge.smart(baseConfig, {
  target: "electron-main",
  entry: {
    main: `${root}/src/main/main.ts`,
    preload: `${root}/src/main/preload.ts`,
  },
  output: {
    path: `${root}/artifacts/webpack/main`,
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
  plugins: compact([
    isDevelopment ? null : new IgnorePlugin(/electron-devtools-installer/),
    new CopyPlugin([
      {
        from: `${root}/package.json`,
        to: `${root}/artifacts/webpack/package.json`,
      },
    ]),
  ]),
});
