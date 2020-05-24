import HtmlWebpackPlugin from "html-webpack-plugin";
import { NamedModulesPlugin, IgnorePlugin } from "webpack";
import merge from "webpack-merge";
import { resolve } from "path";
import nonce from "./nonce";
import baseConfig from "./webpack.base.config";
import getContentSecurityPolicy from "./getContentSecurityPolicy";

const root = resolve(__dirname, "..");

export default merge.smart(baseConfig, {
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
