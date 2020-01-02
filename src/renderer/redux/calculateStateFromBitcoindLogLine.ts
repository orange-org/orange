/* eslint-disable no-plusplus */
/* eslint-disable no-cond-assign */
import { State } from "./reducers";

const initMessage = "init message: ";
const bitcoinCoreVersion = "Bitcoin Core version ";
const usingDataDirectory = "Using data directory ";
const openingLevelDbIn = "Opening LevelDB in ";

const timestampRegExp = /\d{4}-\d{2}-\d{2}\D\d{2}:\d{2}:\d{2}\D\s/;

function parseLine(line: string, prefix: string) {
  return line.match(new RegExp(`${timestampRegExp.source}${prefix}(.*)`));
}

const lineParsingDefinitions = [
  [initMessage, "lastInitMessage"],
  [bitcoinCoreVersion, "bitcoinCoreVersion"],
  [usingDataDirectory, "dataDir"],
  [openingLevelDbIn, "blockIndex"],
];

export function calculateStateFromBitcoindLogLine(state: State, line: string) {
  let parsedLine;

  for (let i = 0; i < lineParsingDefinitions.length; i++) {
    const definition = lineParsingDefinitions[i];

    if ((parsedLine = parseLine(line, definition[0]))) {
      return { ...state, [definition[1]]: parsedLine[1] };
    }
  }

  return state;
}
