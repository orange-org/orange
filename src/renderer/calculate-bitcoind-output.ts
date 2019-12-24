import { State } from "./reducers";

/* eslint-disable no-cond-assign */
const initMessage = "init message: ";
const timestampRegExp = /\d{4}-\d{2}-\d{2}\D\d{2}:\d{2}:\d{2}\D\s/;

function parseLine(line: string, prefix: string) {
  return line.match(new RegExp(`${timestampRegExp.source}${prefix}(.*)`));
}

export function calculateBitcoindOutput(
  bitcoindOutput: State["bitcoindOutput"],
  line: string,
) {
  let parsedLine;

  if ((parsedLine = parseLine(line, initMessage))) {
    return {
      ...bitcoindOutput,
      initMessage: parsedLine[1],
    };
  }

  return bitcoindOutput;
}
