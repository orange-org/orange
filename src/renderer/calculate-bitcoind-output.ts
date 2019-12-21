/* eslint-disable no-cond-assign */
// import { State } from "./types";

const initMessage = "init message: ";
const timestampRegExp = /\d{4}-\d{2}-\d{2}\D\d{2}:\d{2}:\d{2}\D\s/;

function parseLine(line: string, prefix: string) {
  return line.match(new RegExp(`${timestampRegExp.source}${prefix}(.*)`));
}

export function calculateBitcoindOutput(
  bitcoindOutputState: any,
  line: string,
): any {
  let parsedLine;

  if ((parsedLine = parseLine(line, initMessage))) {
    return {
      ...bitcoindOutputState,
      initMessage: parsedLine[1],
    };
  }

  return bitcoindOutputState;
}
