import { Utils } from "_m/common/Utils";
import { StartWindow } from "../StartWindow/StartWindow";

export class CloseWindow extends StartWindow {
  load() {
    this.loadFile(`${Utils.getAppRoot()}/renderer/index.html`, {
      hash: "close",
    });
  }
}
