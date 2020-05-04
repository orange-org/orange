import { app } from "electron";
import { productName } from "_m/../../package.json";

export const getConfigurationsFilePath = () => {
  const userData = app.getPath("userData");
  const configurationsFile = `${userData}/${productName}.json`;

  return configurationsFile;
};
