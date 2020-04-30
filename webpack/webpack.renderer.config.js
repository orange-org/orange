const { NamedModulesPlugin, IgnorePlugin } = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");
const nonce = require("./nonce");

const baseConfig = require("./webpack.base.config");
const getContentSecurityPolicy = require("./getContentSecurityPolicy");

const root = resolve(__dirname, "..");

module.exports = merge.smart(baseConfig, {
  performance: {
    hints: false,
  },
  target: "web",
  entry: {
    app: `${root}/src/renderer/renderer.tsx`,
  },
  output: {
    path: `${root}/artifacts/webpack/renderer`,
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        use: ["file-loader"],
      },
      {
        test: /\.css$/i,
        use: [
          { loader: "style-loader", options: { attributes: { nonce } } },
          "css-loader",
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: ["file-loader?name=fonts/[name].[ext]"],
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
    ],
  },
  plugins: [
    new NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: "Orange",
      template: `${root}/src/renderer/index.html`,
      templateParameters: {
        contentSecurityPolicy: getContentSecurityPolicy(nonce),
        nonce,
      },
    }),
    new IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
  ],
});
