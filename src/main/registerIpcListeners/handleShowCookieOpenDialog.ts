import { dialog } from "electron";
import { getMainWindow } from "_m/getMainWindow";
import { SendableMessageToMain } from "_t/IpcMessages";
import { respondToRenderer } from "_m/callRenderer";

export const handleShowCookieOpenDialog = async (
  data: Extract<SendableMessageToMain, { type: "show-cookie-open-dialog" }>,
) => {
  const mainWindow = getMainWindow();
  const cookie = await dialog.showOpenDialog(mainWindow, {
    buttonLabel: "Select cookie file",
    properties: ["openFile", "showHiddenFiles"],
  });

  respondToRenderer({
    nonce: __NONCE__,
    type: "show-cookie-open-dialog",
    messageId: data.messageId,
    payload: cookie.filePaths?.[0] || null,
  });
};
