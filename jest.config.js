// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
// };

// const { getBabelRule } = require("./webpack/webpack.base.config");

module.exports = {
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
      babelConfig: {
        presets: ["@babel/preset-typescript", "@babel/preset-react"],
        env: {
          test: {
            plugins: ["transform-es2015-modules-commonjs"],
          },
        },
        plugins: [
          [
            "@babel/plugin-proposal-class-properties",
            {
              loose: true,
            },
          ],
          "@babel/plugin-proposal-optional-chaining",
          "@babel/plugin-proposal-nullish-coalescing-operator",
        ],
      },
    },
  },
  modulePaths: ["<rootDir>/src"],
  preset: "ts-jest",
};
