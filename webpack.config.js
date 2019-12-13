const { join } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const webpack = require("webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const env = process.env.NODE_ENV;

module.exports = [
  {
    mode: env || "development",
    entry: join(__dirname, "src", "main.ts"),
    node: {
      __dirname: false,
    },
    target: "electron-main",
    module: {
      rules: [
        {
          test: /\.ts$/,
          include: /src/,
          use: [{ loader: "ts-loader" }],
        },
      ],
    },
    output: {
      path: join(__dirname, "dist"),
      filename: "main.js",
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    },
  },
  {
    mode: "development",
    entry: join(__dirname, "src", "renderer.tsx"),
    target: "electron-renderer",
    module: {
      rules: [
        {
          test: /\.(j|t)s(x)?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              babelrc: false,
              presets: [
                [
                  "@babel/preset-env",
                  { targets: { browsers: "last 1 version" } },
                ],
                "@babel/preset-typescript",
                "@babel/preset-react",
              ],
              plugins: [
                ["@babel/plugin-proposal-class-properties", { loose: true }],
                "react-hot-loader/babel",
              ],
            },
          },
        },
      ],
    },
    output: {
      publicPath: "http://localhost:8080/",
      filename: "renderer.js",
    },
    devtool: "eval-source-map",
    plugins: [
      new ForkTsCheckerWebpackPlugin(),
      new webpack.NamedModulesPlugin(),
      new HtmlWebpackPlugin({
        template: join(__dirname, "src", "index.html"),
      }),
    ],
    resolve: {
      modules: ["node_modules"],
      alias: {
        "react-dom": "@hot-loader/react-dom",
      },
      extensions: [".ts", ".tsx", ".js", ".jsx", "json"],
    },
  },
];

// const developmentConfig = {};

// const productionConfig = {
//   output: {
//     publicPath: "/",
//   },
// };

// module.exports = merge(
//   appConfig,
//   env === "production" ? productionConfig : developmentConfig,
// );
