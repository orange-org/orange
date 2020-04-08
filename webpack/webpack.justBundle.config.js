/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const { compact } = require("lodash");
const { DefinePlugin, IgnorePlugin } = require("webpack");
const merge = require("webpack-merge");
const CopyPlugin = require("copy-webpack-plugin");
const { resolve } = require("path");

const getIsDevelopment = require("./getIsDevelopment");
const { baseConfig, getBabelRule } = require("./webpack.base.config");

const root = resolve(__dirname, "..");
const isDevelopment = getIsDevelopment();

module.exports = merge.smart(baseConfig, {
  target: "node",
  output: {
    path: `${root}/.github/action`,
    filename: "[name].js",
  },
});
