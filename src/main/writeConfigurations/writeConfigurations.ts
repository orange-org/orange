import fs from "fs-extra";
import { merge } from "lodash";
import { Configurations } from "_t/Configurations";
import { getConfigurationsFile } from "./getConfigurationsFile";
import { readConfigurations } from "./readConfigurations";

export const writeConfigurations = async (
  getNewConfigurations: (
    currentConfigurations: Configurations,
  ) => Configurations,
) => {
  const currentConfigurations = await readConfigurations();
  const newConfigurations = getNewConfigurations(currentConfigurations);
  const finalConfigurations = merge(
    {},
    currentConfigurations,
    newConfigurations,
  );
  const configurationsFile = getConfigurationsFile();

  await fs.writeFile(
    configurationsFile,
    JSON.stringify(finalConfigurations, null, 2),
    { encoding: "utf8" },
  );
};
