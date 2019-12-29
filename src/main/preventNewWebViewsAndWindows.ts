import { WebContents, Event } from "electron";

export function preventNewWebViewsAndWindows(
  _event: Event,
  contents: WebContents,
) {
  contents.on("will-attach-webview", contentEvent => {
    contentEvent.preventDefault();
  });

  contents.on("new-window", contentEvent => {
    contentEvent.preventDefault();
  });
}
