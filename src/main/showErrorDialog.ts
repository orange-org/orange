import { dialog } from "electron";

export const showErrorDialog = (message: string) => {
  dialog.showMessageBoxSync({
    type: "warning",
    title: "An error occurred",
    message: [
      "This dialog is for reporting unexpected errors only. Do not follow any instructions that appear in it. The reported error is below.\n",
      message,
    ].join("\n"),
  });
};
