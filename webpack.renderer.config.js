const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { join } = require("path");

const baseConfig = require("./webpack.base.config");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = merge.smart(baseConfig, {
  target: "web",
  entry: {
    app: [
      "@babel/polyfill",
      join(__dirname, "src", "renderer", "renderer.tsx"),
    ],
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
            [
              "@babel/preset-env",
              { targets: { browsers: "last 2 versions " } },
            ],
            "@babel/preset-typescript",
            "@babel/preset-react",
          ],
          plugins: [
            ["@babel/plugin-proposal-class-properties", { loose: true }],
          ],
        },
      },
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
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: "Orange",
      template: join(__dirname, "src", "renderer", "index.html"),
      templateParameters: {
        contentSecurityPolicy: [
          // This is needed for styled-components to be able to inline itself
          // I looked into using a nonce or a hash but that didn't make sense.
          // See https://github.com/orange-org/orange/issues/1
          ["style-src-elem", "'unsafe-inline'"],
          [
            "connect-src",
            isDevelopment
              ? // For development:
                // http: and ws: are needed for hot module replacement
                "http: ws:"
              : // For production, prohibit all outbound connections
                "'none'",
          ],
          // Allow scripts and images loaded from the same location as index.html
          ["script-src-elem", "'self'"],
          ["img-src", "'self'"],

          // Completely disallow the following
          ["child-src", "'none'"],
          ["font-src", "'none'"],
          ["frame-src", "'none'"],
          ["manifest-src", "'none'"],
          ["media-src", "'none'"],
          ["object-src", "'none'"],
          ["script-src", "'none'"],
          ["script-src-attr", "'none'"],
          ["style-src", "'none'"],
          ["style-src-attr", "'none'"],
          ["worker-src", "'none'"],
          ["base-uri", "'none'"],
          ["form-action", "'none'"],
          ["navigate-to", "'none'"],
        ].reduce((previousValue, currentValue) => {
          const [directive, source] = currentValue;

          return `${previousValue}${directive} ${source};`;
        }, ""),
      },
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development",
      ),
    }),
  ],
});
