import { dialog } from "electron";
import { getMainWindow } from "_m/getMainWindow";
import { SendableMessageToMain } from "_t/IpcMessages";
import { respondToRenderer } from "_m/callRenderer";

export const handleGetCookieFileFromOpenDialog = async (
  data: Extract<
    SendableMessageToMain,
    { type: "get-cookie-file-from-open-dialog" }
  >,
) => {
  const mainWindow = getMainWindow();
  const cookie = await dialog.showOpenDialog(mainWindow, {
    buttonLabel: "Select cookie file",
    properties: ["openFile", "showHiddenFiles"],
  });

  respondToRenderer({
    nonce: __NONCE__,
    type: "get-cookie-file-from-open-dialog",
    messageId: data.messageId,
    payload: cookie.filePaths?.[0] || null,
  });
};
