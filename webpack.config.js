const { join, normalize } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = [
  {
    mode: "development",
    entry: normalize("./src/main.ts"),
    target: "electron-main",
    module: {
      rules: [
        {
          test: /\.ts$/,
          include: /src/,
          use: [{ loader: "ts-loader" }]
        }
      ]
    },
    output: {
      path: join(__dirname, "dist"),
      filename: "main.js"
    }
  },
  {
    mode: "development",
    entry: normalize("./src/renderer.tsx"),
    target: "electron-renderer",
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          include: /src/,
          use: [{ loader: "ts-loader" }]
        }
      ]
    },
    output: {
      path: join(__dirname, "dist"),
      filename: "renderer.js"
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: normalize("./src/index.html")
      })
    ]
  }
];
