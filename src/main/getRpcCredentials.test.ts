import { startMainProcess } from "_m/main";
import { BrowserWindow, resetStateOfElectronMock } from "__mocks__/electron";
import { initializeMockOrangeMainProcess } from "__mocks__/electron/initializeMockOrangeMainProcess";
import mockFs from "mock-fs";
import { getGlobalProcess as getGlobalProcess_ } from "_m/getGlobalProcess";
import {
  checkSuccessfulResponse,
  sendAnyRequest,
  setupMockHttpAuthHeader,
  setupProcessVariables,
} from "./testHelpers/getRpcCredentials.testHelpers";
import { getStore } from "./getStore";

const getGlobalProcess = getGlobalProcess_ as jest.Mock;

describe("bitcoindManager", () => {
  let mainWindow: BrowserWindow;

  beforeEach(() => {
    startMainProcess();

    const mockProcess = initializeMockOrangeMainProcess();
    mainWindow = mockProcess.requireWindowByTitle("Orange");
  });

  afterEach(() => {
    resetStateOfElectronMock();
    mockFs.restore();
  });

  afterAll(() => {
    getGlobalProcess.mockRestore();
  });

  test("retrieving authentication cookie on Windows", done => {
    setupProcessVariables(
      {
        platform: "win32",
        env: {
          APPDATA: "appData",
        },
      },
      getGlobalProcess,
    );

    mockFs({
      "appData/Bitcoin": {
        "bitcoin.conf": "",
        ".cookie": "__cookie__:123123",
      },
    });

    const scope = setupMockHttpAuthHeader("__cookie__:123123");
    sendAnyRequest();
    checkSuccessfulResponse(scope, done, mainWindow);
  });

  test("retrieving authentication cookie on Mac", done => {
    setupProcessVariables(
      {
        platform: "darwin",
        env: {
          HOME: "home",
        },
      },
      getGlobalProcess,
    );

    mockFs({
      "home/Library/Application Support/Bitcoin": {
        "bitcoin.conf": "",
        ".cookie": "__cookie__:424242",
      },
    });

    const scope = setupMockHttpAuthHeader("__cookie__:424242");

    sendAnyRequest();
    checkSuccessfulResponse(scope, done, mainWindow);
  });

  test("retrieving authentication cookie on Linux", done => {
    setupProcessVariables(
      {
        platform: "anything other than win32 or darwin",
        env: {
          HOME: "home",
        },
      },
      getGlobalProcess,
    );

    mockFs({
      "home/.bitcoin": {
        "bitcoin.conf": "",
        ".cookie": "__cookie__:1337",
      },
    });

    const scope = setupMockHttpAuthHeader("__cookie__:1337");

    sendAnyRequest();
    checkSuccessfulResponse(scope, done, mainWindow);
  });

  [
    ["testnet", "testnet3", "1234"],
    ["regtest", "regtest", "5678"],
  ].forEach(([networkName, dirName, password]) => {
    test(`${networkName} configurations`, done => {
      setupProcessVariables(
        {
          platform: "anything other than win32 or darwin",
          env: {
            HOME: "home",
          },
        },
        getGlobalProcess,
      );

      mockFs({
        "home/.bitcoin": {
          "bitcoin.conf": `${networkName}=1`,
          [dirName]: {
            ".cookie": `__cookie__:${password}`,
          },
        },
      });

      const scope = setupMockHttpAuthHeader(`__cookie__:${password}`);

      sendAnyRequest();
      checkSuccessfulResponse(scope, done, mainWindow);
    });
  });

  test("caching credentials", done => {
    /**
     * Here we manually add values to the memory cache.
     * `getRpcCredentials` will use these values instead
     * of retrieving the values in the file system.
     *
     * That's why `checkSuccessfulResponse` will succeed even though
     * the values in the file system are wrong.
     */
    // @ts-ignore
    getStore.mockImplementation(() => ({
      username: "__cookie__",
      password: "1337",
    }));

    mockFs({
      "home/.bitcoin": {
        "bitcoin.conf": "",
        ".cookie": "foo:bar",
      },
    });

    const scope = setupMockHttpAuthHeader("__cookie__:1337");
    sendAnyRequest();
    checkSuccessfulResponse(scope, done, mainWindow);
  });
});
