const webpack = require("webpack");
const merge = require("webpack-merge");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { join } = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const PermissionsOutputPlugin = require("webpack-permissions-plugin");

const baseConfig = require("./webpack.base.config");

module.exports = merge.smart(baseConfig, {
  target: "electron-main",
  entry: {
    main: join(__dirname, "src", "main", "main.ts"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          babelrc: false,
          presets: [
            ["@babel/preset-env", { targets: "maintained node versions" }],
            "@babel/preset-typescript",
          ],
          plugins: [
            ["@babel/plugin-proposal-class-properties", { loose: true }],
          ],
        },
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      reportFiles: ["src/main/**/*"],
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development",
      ),
    }),
    new CopyPlugin([
      {
        from: join(__dirname, "src", "vendor"),
        to: join(__dirname, "dist", "vendor"),
      },
    ]),
    new PermissionsOutputPlugin({
      buildFolders: [
        join(__dirname, "src", "vendor"),
        join(__dirname, "dist", "vendor"),
      ],
    }),
  ],
});
