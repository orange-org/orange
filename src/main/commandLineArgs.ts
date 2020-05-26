import { getGlobalProcess } from "./getGlobalProcess";

export type Arguments = {
  datadir?: string;
  testnet?: string;
};

const parseCommandLineArgs = () => {
  const globalProcess = getGlobalProcess();
  const args = globalProcess.argv;
  const argsObj = args.reduce<Arguments>((obj, arg) => {
    const [name, value] = arg.split("=");

    /* istanbul ignore if */
    if (name.substr(0, 2) === "--") {
      // eslint-disable-next-line no-param-reassign
      obj[name.substr(2) as keyof Arguments] = value || "true";
    }

    return obj;
  }, {});

  return argsObj;
};

export const commandLineArgs = parseCommandLineArgs();
