import { Configurations } from "_t/Configurations";
import { app } from "electron";
import fs from "fs-extra";
import { merge } from "lodash";

export const writeConfigurations = async (
  newConfigurations: Configurations,
) => {
  const userData = app.getPath("userData");
  const configurationsFile = `${userData}/orange.json`;
  const currentConfigurations = JSON.parse(
    await fs.readFile(configurationsFile, {
      encoding: "utf8",
    }),
  ) as Configurations;
  const finalConfigurations = merge(
    {},
    currentConfigurations,
    newConfigurations,
  );

  await fs.writeFile(configurationsFile, finalConfigurations, {
    encoding: "utf8",
  });
};
