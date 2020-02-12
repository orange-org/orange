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
  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  // collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!src/typings/**/*",
    "!src/renderer/testUtils/**/*",
  ],
  testRegex: "((\\.|/)(test|spec))\\.[jt]sx?$",
  modulePaths: ["<rootDir>/src"],
};
