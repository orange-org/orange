import { getGlobalProcess } from "./getGlobalProcess";

export type Arguments = {
  datadir?: string;
};

export const parseCommandLineArgs = () => {
  const globalProcess = getGlobalProcess();
  const args = globalProcess.argv;
  const argsObj = args.reduce<Arguments>((obj, arg) => {
    const [name, value] = arg.split("=");

    if (name.substr(0, 2) === "--") {
      // eslint-disable-next-line no-param-reassign
      obj[name.substr(2) as keyof Arguments] = value;
    }

    return obj;
  }, {});

  return argsObj;
};
