import fs from "fs-extra";
import { DeepPartial } from "redux";
import { Configurations } from "_t/Configurations";
import { getConfigurationsFilePath } from "./getConfigurationsFilePath";

export const readConfigurations = async (): Promise<DeepPartial<
  Configurations
>> => {
  const configurationsFilePath = getConfigurationsFilePath();

  await fs.ensureFile(configurationsFilePath);

  const currentConfigurationsFileContent = await fs.readFile(
    configurationsFilePath,
    {
      encoding: "utf8",
    },
  );

  return currentConfigurationsFileContent
    ? JSON.parse(currentConfigurationsFileContent)
    : {};
};
