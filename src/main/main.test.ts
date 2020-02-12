import { ipcMain } from "__mocks__/electron";
import { initializeMockOrangeMainProcess } from "__mocks__/electron/initializeMockOrangeMainProcess";
import { startApp } from "_m/main";

describe("main", () => {
  it("works", () => {
    startApp();
    const mockProcess = initializeMockOrangeMainProcess();
    const mainWindow = mockProcess.requireWindowByTitle("Orange");

    ipcMain.emit("message-to-main", {}, {});

    mainWindow.webContents.once("message-to-renderer", () => {});

    expect(true).toBe(true);
  });
});