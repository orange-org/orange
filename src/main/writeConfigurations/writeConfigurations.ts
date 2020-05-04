import fs from "fs-extra";
import { merge } from "lodash";
import { Configurations } from "_t/Configurations";
import { getConfigurationsFilePath } from "./getConfigurationsFilePath";
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
  const configurationsFilePath = getConfigurationsFilePath();

  await fs.writeFile(
    configurationsFilePath,
    JSON.stringify(finalConfigurations, null, 2),
    { encoding: "utf8" },
  );
};
