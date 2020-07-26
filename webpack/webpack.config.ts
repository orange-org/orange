import HtmlWebpackPlugin from "html-webpack-plugin";
import {
  Configuration,
  DefinePlugin,
  NamedModulesPlugin,
  IgnorePlugin,
} from "webpack";
// @ts-ignore
import HtmlWebpackInlineSourcePlugin from "html-webpack-inline-source-plugin";
import { resolve } from "path";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import getContentSecurityPolicy from "./getContentSecurityPolicy";
import getIsDevelopment from "./getIsDevelopment";

/**
 * This ensures TsconfigPathsPlugin doesn't get confused
 */
delete process.env.TS_NODE_PROJECT;

const root = resolve(__dirname, "..");
const isDevelopment = getIsDevelopment();

export const configuration: Configuration = {
  mode: isDevelopment ? "development" : "production",

  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
    plugins: [new TsconfigPathsPlugin()],
  },

  devtool: false,

  performance: {
    hints: false,
  },

  target: "web",

  entry: {
    app: `${root}/src/index.tsx`,
  },

  output: {
    path: `${root}/artifacts/webpack/renderer`,
    filename: "[name].js",
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          configFile: `${root}/babel.config.js`,
        },
      },

      {
        test: /\.(gif|png|jpe?g|svg)$/,
        use: ["file-loader"],
      },

      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "@teamsupercell/typings-for-css-modules-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]_[local]_[hash:base64:5]",
              },
            },
          },
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
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development",
      ),
    }),

    new NamedModulesPlugin(),

    new HtmlWebpackPlugin({
      inlineSource: ".(js|css)$",
      title: "Orange",
      template: `${root}/src/index.html`,
      templateParameters: {
        contentSecurityPolicy: getContentSecurityPolicy(),
      },
    }),

    new HtmlWebpackInlineSourcePlugin(),

    new IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
  ],
};
