/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const merge = require("webpack-merge");
const { resolve } = require("path");

const baseConfig = require("./webpack.base.config");

const root = resolve(__dirname, "..");

module.exports = merge.smart(baseConfig, {
  mode: "production",
  target: "node",
  entry: `${root}/.github/action/index.ts`,
  output: { path: `${root}/.github/action`, filename: "index.js" },
  devtool: "none",
});
