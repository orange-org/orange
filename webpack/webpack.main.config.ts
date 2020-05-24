/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import { compact } from "lodash";
import { IgnorePlugin } from "webpack";
import merge from "webpack-merge";
import CopyPlugin from "copy-webpack-plugin";
import { resolve } from "path";
import getIsDevelopment from "./getIsDevelopment";
import baseConfig from "./webpack.base.config";
import { buildConstants } from './buildConstants';

const root = resolve(__dirname, "..");
const isDevelopment = getIsDevelopment();

export default merge.smart(baseConfig, {
  target: "electron-main",
  entry: {
    main: `${root}/${buildConstants.mainTs}`,
    preload: `${root}/${buildConstants.preloadTs}`,
  },
  output: {
    path: `${root}/${buildConstants.artifactsWebpackMain}`,
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
        from: `${root}/${buildConstants.packageJson}`,
        to: `${root}/${buildConstants.artifactsWebpackPackageJson}`,
      },
    ]),
    new CopyBinsPlugin(),
  ]),
});
