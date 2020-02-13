import { startMainProcess } from "_m/main";
import { BrowserWindow, resetStateOfElectronMock } from "__mocks__/electron";
import { initializeMockOrangeMainProcess } from "__mocks__/electron/initializeMockOrangeMainProcess";
import mockFs from "mock-fs";
import { getGlobalProcess as getGlobalProcess_ } from "_m/getGlobalProcess";
import {
  expectSuccessfulResponse,
  sendAnyRequest,
  setupMockHttpAuthHeader,
  setupProcessVariables,
} from "./testHelpers/getRpcCredentials.testHelpers";

jest.mock("_m/getGlobalProcess", () => ({
  getGlobalProcess: jest.fn(),
}));

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
    // getStore.mockImplementation(() => null);
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
    expectSuccessfulResponse(scope, done, mainWindow);
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
    expectSuccessfulResponse(scope, done, mainWindow);
  });
});
