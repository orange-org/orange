import { app, WebContents, BrowserWindow } from "__mocks__/electron";

export const initializeMockOrangeMainProcess = () => {
  app.emit("ready");
  app.emit("web-contents-created", new Event("type"), new WebContents());

  const { value: mainWindow } = BrowserWindow.instances.find(
    instance => instance.name === "Orange",
  )!;

  mainWindow.webContents.emit("did-finish-load");

  return {
    requireWindowByTitle: (title: string) => {
      const browserWindow = BrowserWindow.instances.find(
        instance => instance.name === title,
      )?.value;

      if (!browserWindow) {
        throw new Error(`Could not find browser window with name: ${title}`);
      }

      return browserWindow;
    },
  };
};
