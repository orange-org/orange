import { startMainProcess } from "_m/main";
import { BrowserWindow, resetStateOfElectronMock } from "__mocks__/electron";
import { initializeMockOrangeMainProcess } from "__mocks__/electron/initializeMockOrangeMainProcess";
import {
  expectSuccessfulResponse,
  sendAnyRequest,
  setupMockHttpAuthHeader,
} from "./testHelpers/bitcoindManager.testHelpers";

describe("bitcoindManager", () => {
  let mainWindow: BrowserWindow;

  beforeEach(() => {
    startMainProcess();

    const mockProcess = initializeMockOrangeMainProcess();
    mainWindow = mockProcess.requireWindowByTitle("Orange");
  });

  afterEach(() => {
    resetStateOfElectronMock();
  });

  test("retrieving authentication cookie on Windows", done => {
    const scope = setupMockHttpAuthHeader(
      "__cookie__:865026174c8f2ec78d71898771436a4b45afeb489903e861c8807a17682d1361",
    );
    sendAnyRequest();
    expectSuccessfulResponse(scope, done, mainWindow);
  });
});
