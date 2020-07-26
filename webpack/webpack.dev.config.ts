import merge from "webpack-merge";
import { configuration } from "./webpack.config";

export default merge.smart(configuration, {
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },

  devServer: {
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
