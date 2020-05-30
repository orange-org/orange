import { productName } from "_m/../../package.json";
import fs from "fs-extra";
import { merge } from "lodash";
import { Configurations } from "_t/Configurations";
import { DeepPartial } from "redux";
import { app } from "electron";

class Settings {
  configurationsFilePath = `${app.getPath("userData")}/${productName}.json`;

  write = async (
    getNewConfigurations: (
      currentConfigurations: Configurations,
    ) => Configurations,
  ) => {
    const currentConfigurations = await this.read();
    const newConfigurations = getNewConfigurations(currentConfigurations);
    const finalConfigurations = merge(
      {},
      currentConfigurations,
      newConfigurations,
    );

    await fs.writeFile(
      this.configurationsFilePath,
      JSON.stringify(finalConfigurations, null, 2),
      { encoding: "utf8" },
    );
  };

  read = async (): Promise<DeepPartial<Configurations>> => {
    await fs.ensureFile(this.configurationsFilePath);

    const currentConfigurationsFileContent = await fs.readFile(
      this.configurationsFilePath,
      {
        encoding: "utf8",
      },
    );

    return currentConfigurationsFileContent
      ? JSON.parse(currentConfigurationsFileContent)
      : {};
  };
}

export const settings = new Settings();
