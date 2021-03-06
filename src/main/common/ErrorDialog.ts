import { dialog } from "electron";

export class ErrorDialog {
  static show = (message: string) =>
    dialog.showMessageBox({
      type: "warning",
      title: "An error occurred",
      message: [
        "This dialog is for reporting unexpected errors only. Do not follow any instructions that appear in it. The reported error is below.\n",
        message,
      ].join("\n"),
    });
}
