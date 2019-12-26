const merge = require("webpack-merge");

const baseConfig = require("./webpack.renderer.config");

module.exports = merge.smart(baseConfig, {
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
  devServer: {
    port: 2003,
    https: true,
    compress: true,
    noInfo: true,
    stats: "errors-only",
    inline: true,
    hot: true,
    historyApiFallback: {
      verbose: true,
      disableDotRule: false,
    },
  },
});
