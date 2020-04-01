/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const { compact } = require("lodash-es");
const { DefinePlugin, IgnorePlugin } = require("webpack");
const merge = require("webpack-merge");

const getRootDir = require("./getRootDir");
const getIsDevelopment = require("./getIsDevelopment");
const { baseConfig, getBabelRule } = require("./webpack.base.config");

const root = getRootDir();
const isDevelopment = getIsDevelopment();

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
  plugins: compact([
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development",
      ),
    }),
    isDevelopment ? null : new IgnorePlugin(/electron-devtools-installer/),
  ]),
});
