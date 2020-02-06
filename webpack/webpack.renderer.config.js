const { DefinePlugin, NamedModulesPlugin } = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { join } = require("path");

const { baseConfig, getBabelRule } = require("./webpack.base.config");
const getIsDevelopment = require("./getIsDevelopment");
const getContentSecurityPolicy = require("./getContentSecurityPolicy");
const getRootDir = require("./getRootDir");

const root = getRootDir();

const isDevelopment = getIsDevelopment();

module.exports = merge.smart(baseConfig, {
  target: "web",
  entry: {
    app: ["@babel/polyfill", join(root, "src", "renderer", "renderer.tsx")],
  },
  output: {
    path: join(root, "dist", "renderer"),
    filename: "[name].js",
  },
  module: {
    rules: [
      getBabelRule(true),
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              disable: true,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
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
    new ForkTsCheckerWebpackPlugin(),
    new NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: "Orange",
      template: join(root, "src", "renderer", "index.html"),
      templateParameters: {
        contentSecurityPolicy: getContentSecurityPolicy(),
      },
    }),
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development",
      ),
    }),
  ],
});
