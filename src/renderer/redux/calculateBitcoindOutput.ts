/* eslint-disable no-cond-assign */
import { State } from "./reducers";

const initMessage = "init message: ";
const bitcoinCoreVersion = "Bitcoin Core version ";
const timestampRegExp = /\d{4}-\d{2}-\d{2}\D\d{2}:\d{2}:\d{2}\D\s/;

function parseLine(line: string, prefix: string) {
  return line.match(new RegExp(`${timestampRegExp.source}${prefix}(.*)`));
}

export function calculateBitcoindOutput(state: State, line: string) {
  let parsedLine;

  if ((parsedLine = parseLine(line, initMessage))) {
    return {
      ...state,
      lastInitMessage: parsedLine[1],
    };
  }

  if ((parsedLine = parseLine(line, bitcoinCoreVersion))) {
    return {
      ...state,
      bitcoinCoreVersion: parsedLine[1],
    };
  }

  return state;
}
