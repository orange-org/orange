/* istanbul ignore file: this function simply handles command line arguments
from the Squirrel Windows installer. The logic is both declarative and
cumbersome to test, so it's not being tested. */
import { spawn } from "child_process";
import { app, dialog } from "electron";
import { dirname, resolve } from "path";
import { productName } from "../../package.json";

export class SquirrelEvents {
  cmd = process.argv[1];

  target = process.execPath;

  private runSquirrelUpdateExe = (
    args: string[],
    done: (...args: any[]) => void,
  ) => {
    const updateExe = resolve(dirname(process.execPath), "..", "Update.exe");
    spawn(updateExe, args, { detached: true }).on("close", done);
  };

  handle = () => {
    const { cmd, target } = this;

    if (cmd === "--squirrel-install" || cmd === "--squirrel-updated") {
      this.runSquirrelUpdateExe(
        [
          `--createShortcut=${target}`,
          "--shortcut-locations=StartMenu,Desktop",
        ],
        app.quit,
      );
      return true;
    }
    if (cmd === "--squirrel-uninstall") {
      this.runSquirrelUpdateExe([`--removeShortcut=${target}`], app.quit);
      return true;
    }
    if (cmd === "--squirrel-obsolete") {
      app.quit();
      return true;
    }

    if (cmd === "--squirrel-firstrun") {
      dialog.showMessageBoxSync({
        type: "info",
        title: "Success!",
        message: `${productName} was installed successfully!\n\nLook for its icon on your desktop.`,
      });

      app.quit();
      return true;
    }

    return false;
  };
}

export const squirrelEvents = new SquirrelEvents();
