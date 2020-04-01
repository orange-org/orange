const { DefinePlugin, NamedModulesPlugin, IgnorePlugin } = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { baseConfig, getBabelRule } = require("./webpack.base.config");
const getIsDevelopment = require("./getIsDevelopment");
const getContentSecurityPolicy = require("./getContentSecurityPolicy");
const getRootDir = require("./getRootDir");

const root = getRootDir();

const isDevelopment = getIsDevelopment();

const chunkDefinitions = [
  { name: "reactVendor", modules: ["react", "react-dom"] },
  { name: "bluebirdVendor", modules: ["bluebird"] },
  { name: "materialUiVendor", modules: ["@material-ui"] },
  { name: "momentVendor", modules: ["moment"] },
];

const cacheGroups = chunkDefinitions.reduce(
  (cacheGroups, chunkDefinition) => {
    // eslint-disable-next-line no-param-reassign
    cacheGroups[chunkDefinition.name] = {
      test: new RegExp(
        `[\\/]node_modules[\\/](${chunkDefinition.modules.join("|")})[\\/]`,
      ),
      name: chunkDefinition.name,
    };

    return cacheGroups;
  },
  {
    vendor: {
      test: new RegExp(
        `[\\/]node_modules[\\/](${chunkDefinitions
          .reduce((allModules, chunkDefinition) => {
            const moduleNamesExcludedRegExp = chunkDefinition.modules.map(
              moduleName => `(!${moduleName})`,
            );

            allModules.push(...moduleNamesExcludedRegExp);

            return allModules;
          }, [])
          .join("")})[\\/]`,
      ),
      name: "vendor",
    },
  },
);

console.log("cacheGroups", cacheGroups);

module.exports = merge.smart(baseConfig, {
  target: "web",
  entry: {
    app: `${root}/src/renderer/renderer.tsx`,
  },
  output: {
    path: `${root}/dist/renderer`,
    filename: "[name].js",
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: chunkDefinitions.reduce(
        (cacheGroups, chunkDefinition) => {
          // eslint-disable-next-line no-param-reassign
          cacheGroups[chunkDefinition.name] = {
            test: new RegExp(
              `[\\/]node_modules[\\/](${chunkDefinition.modules.join(
                "|",
              )})[\\/]`,
            ),
            name: chunkDefinition.name,
          };

          return cacheGroups;
        },
        {
          vendor: {
            test: new RegExp(
              `[\\/]node_modules[\\/](${chunkDefinitions
                .reduce((allModules, chunkDefinition) => {
                  const moduleNamesExcludedRegExp = chunkDefinition.modules.map(
                    moduleName => `(!${moduleName})`,
                  );

                  allModules.push(...moduleNamesExcludedRegExp);

                  return allModules;
                }, [])
                .join("")})[\\/]`,
            ),
            name: "vendor",
          },
        },
      ),
    },
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        use: ["file-loader"],
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
    new NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: "Orange",
      template: `${root}/src/renderer/index.html`,
      templateParameters: {
        contentSecurityPolicy: getContentSecurityPolicy(),
      },
    }),
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development",
      ),
    }),
    new IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
  ],
});
