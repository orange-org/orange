/* eslint-disable no-plusplus */
/* eslint-disable no-cond-assign */
import { State } from "./reducers";

const initMessage = "init message: ";
const bitcoinCoreVersion = "Bitcoin Core version ";
const usingDataDirectory = "Using data directory ";
const openingLevelDbIn = "Opening LevelDB in ";
const updateTip = "UpdateTip: ";

const timestampRegExp = /\d{4}-\d{2}-\d{2}\D\d{2}:\d{2}:\d{2}\D\s/;
const updateTipRegExp = /new best=([a-fA-F0-9]+).*height=(\d+).*progress=(\d*\.?\d*)/;

function parseLine(line: string, prefix: string) {
  return line.match(new RegExp(`${timestampRegExp.source}${prefix}(.*)`));
}

type StateKeysFunction = (parsedLine: RegExpMatchArray, state: State) => State;
const lineParsingDefinitions: [string, string | StateKeysFunction][] = [
  [initMessage, "lastInitMessage"],
  [bitcoinCoreVersion, "bitcoinCoreVersion"],
  [usingDataDirectory, "dataDir"],
  [openingLevelDbIn, "blockIndex"],
  [
    updateTip,
    (parsedLine, state) => {
      const parsedData = parsedLine[1].match(
        updateTipRegExp,
      ) as RegExpMatchArray;
      const bestBlockHash = parsedData[1];
      const blocks = parseInt(parsedData[2], 10);
      const processingBlocksOnDisk = {
        active: true,
        progress: parseFloat(parsedData[3]),
      };

      return {
        ...state,
        bestBlock: {
          ...state.bestBlock,
          hash: bestBlockHash,
        },
        blockchainInfo: {
          ...state.blockchainInfo,
          blocks,
        },
        processingBlocksOnDisk,
      };
    },
  ],
];

function processLine(state: State, line: string): State {
  let parsedLine;

  for (let i = 0; i < lineParsingDefinitions.length; i++) {
    const definition = lineParsingDefinitions[i];

    if ((parsedLine = parseLine(line, definition[0]))) {
      const stateKeys = definition[1];

      return typeof stateKeys === "function"
        ? stateKeys(parsedLine, state)
        : { ...state, [stateKeys]: parsedLine[1] };
    }
  }

  return state;
}

export function calculateStateFromBitcoindLogLines(
  state: State,
  lines: string[],
): State {
  let newState = state;

  for (let i = 0; i < lines.length; i++) {
    newState = processLine(newState, lines[i]);
  }

  return newState;
}
