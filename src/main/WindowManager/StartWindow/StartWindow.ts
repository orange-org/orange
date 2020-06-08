import { Utils } from "_m/common/Utils";
import { OrangeWindow } from "../common/OrangeWindow";

export class StartWindow extends OrangeWindow {
  load() {
    this.loadFile(`${Utils.getAppRoot()}/renderer/index.html`, {
      hash: "start",
    });
  }

  constructor() {
    super({
      width: 500,
      height: 300,
      frame: false,
      resizable: !!Utils.isDevelopment(),
      movable: false,
    });
  }
}
