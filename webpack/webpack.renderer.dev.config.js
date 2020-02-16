const merge = require("webpack-merge");

const baseRendererConfig = require("./webpack.renderer.config");

module.exports = merge.smart(baseRendererConfig, {
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
  devServer: {
    writeToDisk: true,
    port: 2003,
    compress: true,
    // noInfo: true,
    stats: "errors-only",
    inline: true,
    hot: true,
    historyApiFallback: {
      verbose: true,
      disableDotRule: false,
    },
  },
});
