/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const merge = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");
const { resolve } = require("path");

const baseConfig = require("./webpack.base.config");

const root = resolve(__dirname, "..");
const filename = process.env.FILENAME || `action`;

module.exports = merge.smart(baseConfig, {
  mode: "production",
  target: "node",
  entry: `${root}/.github/action/${filename}.ts`,
  output: { path: `${root}/.github/action`, filename: `${filename}.js` },
  devtool: "none",
  externals: [nodeExternals()],
});
