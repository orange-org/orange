import { isWhitelistedUrl } from "_m/isWhitelistedUrl/isWhitelistedUrl";
import { getMainWindow } from "./getMainWindow";

export function preventNetworkAndResourceRequests() {
  const mainWindow = getMainWindow();

  // This prevents Electron from making any network requests to the outside
  // world. It also prevents loading any content from a non-whitelisted domain.
  // This provides redundancy to the content security policy set on the `renderer` process
  mainWindow.webContents.session.webRequest.onBeforeRequest(
    (details, response) => {
      response({ cancel: !isWhitelistedUrl(details.url) });
    },
  );
}
