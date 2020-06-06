import { productName } from "_m/../../package.json";
import fs from "fs-extra";
import { merge } from "lodash";
import { Settings as TSettings } from "_t/Settings";
import { DeepPartial } from "redux";
import { app } from "electron";

export class Settings {
  static userDataPath = () => app.getPath("userData");

  static configurationsFilePath = `${Settings.userDataPath}/${productName}.json`;

  static write = async (
    getNewConfigurations: (currentConfigurations: TSettings) => TSettings,
  ) => {
    const currentConfigurations = await Settings.read();
    const newConfigurations = getNewConfigurations(currentConfigurations);
    const finalConfigurations = merge(
      {},
      currentConfigurations,
      newConfigurations,
    );

    await fs.writeFile(
      Settings.configurationsFilePath,
      JSON.stringify(finalConfigurations, null, 2),
      { encoding: "utf8" },
    );
  };

  static read = async (): Promise<DeepPartial<TSettings>> => {
    await fs.ensureFile(Settings.configurationsFilePath);

    const currentConfigurationsFileContent = await fs.readFile(
      Settings.configurationsFilePath,
      {
        encoding: "utf8",
      },
    );

    return currentConfigurationsFileContent
      ? JSON.parse(currentConfigurationsFileContent)
      : {};
  };
}
