/* eslint-disable no-await-in-loop */
/* eslint-disable no-constant-condition */
import { Core } from "_m/BackendServicesManager/Core/Core";
import { Utils } from "_m/common/Utils";
import { Lnd } from "./Lnd/Lnd";

class BackendServicesManager {
  constructor(private core: Core, private lnd: Lnd) {}

  private spawnLndWhenCoreIsReady = async () => {
    while (true) {
      const response = await this.callCore({ method: "uptime" });

      if (response.result) {
        break;
      }

      await Utils.delay(500);
    }

    this.lnd.spawn();
  };

  callCore = this.core.call;

  spawn = () => {
    this.core.spawn();
    this.spawnLndWhenCoreIsReady();
  };

  stop = () => Promise.all([this.core.stop(), this.lnd.stop()]);
}

export const backendServicesManager = new BackendServicesManager(
  new Core("Core", "bitcoind"),
  new Lnd("Lnd", "lnd"),
);
