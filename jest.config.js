const { pathsToModuleNameMapper } = require("ts-jest/utils");
const globalConstants = require("./webpack/globalConstants");
const { compilerOptions } = require("./tsconfig");

module.exports = {
  globals: {
    ...Object.keys(globalConstants).reduce((acc, key) => {
      acc[key] = globalConstants[key];

      return acc;
    }, {}),
  },
  setupFiles: ["<rootDir>/jest/setupFile.js"],
  setupFilesAfterEnv: ["<rootDir>/jest/setupFileAfterEnv.js"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  testPathIgnorePatterns: [
    "<rootDir>[/\\\\](artifacts|node_modules|scripts)[/\\\\]",
    "<rootDir>/artifacts/webpack/package.json",
  ],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!src/typings/**/*",
    "!**testUtils**",
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  testRegex: "((\\.|/)(test|spec))\\.[jt]sx?$",
  modulePaths: ["<rootDir>/src"],
};
