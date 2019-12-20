/* eslint-disable no-cond-assign */
import { BitcoindOutput } from "./types";

const initMessageString = "init message: ";
const timestampRegExp = /\d{4}-\d{2}-\d{2}\D\d{2}:\d{2}:\d{2}\D\s/;

function parseLine(line: string, prefix: string) {
  return line.match(new RegExp(`${timestampRegExp.source}${prefix}(.*)`));
}

export function calculateBitcoindOutput(
  bitcoindOutputState: BitcoindOutput,
  line: string,
): BitcoindOutput {
  let parsedLine;

  if ((parsedLine = parseLine(line, initMessageString))) {
    return {
      ...bitcoindOutputState,
      initMessage: parsedLine[1],
    };
  }

  return bitcoindOutputState;
}
