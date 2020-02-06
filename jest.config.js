const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig");

module.exports = {
  globals: {
    // "ts-jest": {
    //   tsConfig: "tsconfig.json",
    //   babelConfig: {
    //     presets: [
    //       [
    //         "@babel/preset-env",
    //         {
    //           // modules: "commonjs",
    //           // loose: false,
    //           // debug: isDebug,
    //           targets: {
    //             // node: "current",
    //             browsers: "last 2 versions",
    //           },
    //           // useBuiltIns: "usage",
    //           // shippedProposals: true,
    //         },
    //       ],
    //       "@babel/preset-typescript",
    //       "@babel/preset-react",
    //     ],
    //     env: {
    //       test: {
    //         plugins: ["transform-es2015-modules-commonjs"],
    //       },
    //     },
    //     plugins: [
    //       [
    //         "@babel/plugin-proposal-class-properties",
    //         {
    //           loose: true,
    //         },
    //       ],
    //       "@babel/plugin-proposal-optional-chaining",
    //       "@babel/plugin-proposal-nullish-coalescing-operator",
    //     ],
    //   },
    // },
  },
  // transform: {
  //   "^.+\\.tsx?$": "ts-jest",
  // },
  // moduleNameMapper: {
  //   "\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|graphql)$":
  //     "<rootDir>/__mocks__/fileMock.js",
  //   "\\.(svg)$": "<rootDir>/__mocks__/svgSpriteMock.js",
  //   // "\\.(css|scss)$": "identity-obj-proxy",
  //   // "\\.html?$": "html-loader-jest",
  // },
  globalSetup: "<rootDir>/jest/setup.js",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  modulePaths: ["<rootDir>/src"],
  preset: "ts-jest",
};
