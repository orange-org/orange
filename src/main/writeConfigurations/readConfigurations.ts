import fs from "fs-extra";
import { DeepPartial } from "redux";
import { Configurations } from "_t/Configurations";
import { getConfigurationsFile } from "./getConfigurationsFile";

export const readConfigurations = async (): Promise<DeepPartial<
  Configurations
>> => {
  const configurationsFile = getConfigurationsFile();

  await fs.ensureFile(configurationsFile);

  const currentConfigurationsFileContent = await fs.readFile(
    configurationsFile,
    {
      encoding: "utf8",
    },
  );

  return currentConfigurationsFileContent
    ? JSON.parse(currentConfigurationsFileContent)
    : {};
};
