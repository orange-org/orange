import { dialog } from "electron";

export const showErrorDialog = (message: string) => {
  dialog.showErrorBox(
    "Untrusted Error Dialog",
    [
      "This is an untrusted window. It is for error reporting only. Do not follow any instructions that appear in it.\n",
      message,
    ].join("\n"),
  );
};
