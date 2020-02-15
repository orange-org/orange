/* istanbul ignore file: this file is mocked during tests */
/**
 * Acquiring `process` through this function rather than directly gives us a
 * chance to mock `process` for tests.
 */
export const getGlobalProcess = () => process;
