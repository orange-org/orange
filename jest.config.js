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
  setupFilesAfterEnv: ["<rootDir>/jest/setupFilesAfterEnv.js"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  // collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!src/typings/**/*",
  ],
  modulePaths: ["<rootDir>/src"],
};
