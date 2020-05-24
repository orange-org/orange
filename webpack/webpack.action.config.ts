/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import merge from "webpack-merge";
import { resolve } from "path";
import nodeExternals from "webpack-node-externals";
import baseConfig from "./webpack.base.config";

const root = resolve(__dirname, "..");
const filename = process.env.FILENAME || `action`;

export default merge.smart(baseConfig, {
  mode: "production",
  target: "node",
  entry: `${root}/.github/action/${filename}.ts`,
  output: { path: `${root}/.github/action`, filename: `${filename}.js` },
  devtool: false,
  externals: [nodeExternals()],
});
