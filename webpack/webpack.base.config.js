const { compact } = require("lodash");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { DefinePlugin } = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const crypto = require("crypto");

exports.baseConfig = {
  mode: "development",
  node: {
    __dirname: false,
    __filename: false,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
    plugins: [new TsconfigPathsPlugin()],
  },
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin(),
    new DefinePlugin({
      __NONCE__: JSON.stringify('crypto.randomBytes(16).toString("base64")'),
    }),
  ],
};

exports.getBabelRule = isRenderer => {
  return {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    loader: "babel-loader",
    options: {
      cacheDirectory: true,
      babelrc: false,
      presets: compact([
        [
          "@babel/preset-env",
          {
            targets: isRenderer
              ? {
                  browsers: "last 2 versions",
                }
              : "maintained node versions",
          },
        ],
        "@babel/preset-typescript",
        isRenderer ? "@babel/preset-react" : null,
      ]),
      env: {
        test: {
          plugins: ["transform-es2015-modules-commonjs"],
        },
      },
      plugins: compact([
        ["@babel/plugin-proposal-class-properties", { loose: true }],
        "@babel/plugin-proposal-optional-chaining",
        "@babel/plugin-proposal-nullish-coalescing-operator",
        isRenderer ? "react-hot-loader/babel" : null,
      ]),
    },
  };
};
