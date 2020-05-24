/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import { compact } from "lodash";
import { IgnorePlugin } from "webpack";
import merge from "webpack-merge";
import CopyPlugin from "copy-webpack-plugin";
import { resolve } from "path";
import getIsDevelopment from "./getIsDevelopment";
import baseConfig from "./webpack.base.config";

const root = resolve(__dirname, "..");
const isDevelopment = getIsDevelopment();

export default merge.smart(baseConfig, {
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
