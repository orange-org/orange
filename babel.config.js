module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    "@babel/preset-typescript",
    "@babel/preset-react",
  ],
  env: {
    test: {
      plugins: ["transform-es2015-modules-commonjs"],
    },
  },
  plugins: [
    "@hh.ru/babel-plugin-react-displayname",
    "lodash",
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-nullish-coalescing-operator",
  ],
};
