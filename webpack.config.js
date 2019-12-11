const { join } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = [
  {
    mode: "development",
    entry: join(__dirname, "src", "main.ts"),
    node: {
      __dirname: false
    },
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
    entry: join(__dirname, "src", "renderer.tsx"),
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
        template: join(__dirname, "src", "index.html")
      })
    ]
  }
];
