import { dialog } from "electron";
import { windowManager } from "_m/WindowManager";
import { SendableMessageToMain } from "_t/IpcMessages";

export class GetCookiePathFromOpenDialogIpcEvent {
  static handle = async (
    data: Extract<
      SendableMessageToMain,
      { type: "get-cookie-path-from-open-dialog" }
    >,
  ) => {
    const mainWindow = windowManager.getMainWindow();
    const cookie = await dialog.showOpenDialog(mainWindow, {
      buttonLabel: "Select cookie file",
      properties: ["openFile", "showHiddenFiles"],
    });

    windowManager.sendMessageToMainWindow({
      nonce: __NONCE__,
      type: "get-cookie-path-from-open-dialog",
      messageId: data.messageId,
      payload: cookie.filePaths?.[0] || null,
    });
  };
}
