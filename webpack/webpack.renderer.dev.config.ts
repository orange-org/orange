import merge from "webpack-merge";
import baseRendererConfig from "./webpack.renderer.config";

export default merge.smart(baseRendererConfig, {
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },

  devServer: {
    writeToDisk: true,
    port: 2003,
    compress: true,
    stats: "errors-only",
    inline: true,
    hot: true,
    historyApiFallback: {
      verbose: true,
    },
    watchOptions: {
      poll: 1000,
      ignored: ["node_modules"],
    },
  },
});
