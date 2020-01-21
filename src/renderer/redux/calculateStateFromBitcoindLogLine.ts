/* eslint-disable no-plusplus */
/* eslint-disable no-cond-assign */
import { State } from "_r/redux/reducers";

const initMessage = "init message: ";
const bitcoinCoreVersion = "Bitcoin Core version ";
const usingDataDirectory = "Using data directory ";
const openingLevelDbIn = "Opening LevelDB in ";
const shutdown = "Shutdown: In progress";
// const updateTip = "UpdateTip: ";
const synchronizingBlockHeaders = "Synchronizing blockheaders, ";

const timestampRegExp = /\d{4}-\d{2}-\d{2}\D\d{2}:\d{2}:\d{2}\D\s/;
// const updateTipRegExp = /new best=([a-fA-F0-9]+).*height=(\d+).*progress=(\d*\.?\d*)/;
const synchronizingBlockHeadersRegExp = /height: \d+ \(~?(\d+\.\d+)%\)/;

function parseLine(line: string, prefix: string) {
  return line.match(new RegExp(`${timestampRegExp.source}${prefix}(.*)`));
}

type StateKeysFunction = (parsedLine: RegExpMatchArray, state: State) => State;
const lineParsingDefinitions: [string, keyof State | StateKeysFunction][] = [
  [bitcoinCoreVersion, "bitcoinCoreVersion"],
  [usingDataDirectory, "dataDir"],
  [openingLevelDbIn, "blockIndex"],
  [shutdown, "shutdownInProgress"],
  // [
  //   updateTip,
  //   (parsedLine, state) => {
  //     const parsedData = parsedLine[1].match(
  //       updateTipRegExp,
  //     ) as RegExpMatchArray;
  //     const bestBlockHash = parsedData[1];
  //     const blocks = parseInt(parsedData[2], 10);

  //     return {
  //       ...state,
  //       bestBlock: {
  //         ...state.bestBlock,
  //         hash: bestBlockHash,
  //       },
  //       blockchainInfo: {
  //         ...state.blockchainInfo,
  //         blocks,
  //       },

  //       // We multiply by 100 here because this comes in as 0.1 equaling 100%
  //       synchronizingBlocksProgress: parseFloat(parsedData[3]) * 100,
  //     };
  //   },
  // ],
  [
    synchronizingBlockHeaders,
    (parsedLine, state) => {
      const parsedData = parsedLine[1].match(
        synchronizingBlockHeadersRegExp,
      ) as RegExpMatchArray;

      return {
        ...state,
        synchronizingBlockHeadersProgress: parseFloat(parsedData[1]),
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

      if (typeof stateKeys === "function") {
        return stateKeys(parsedLine, state);
      }

      if (stateKeys === "shutdownInProgress") {
        return { ...state, [stateKeys]: true };
      }

      return { ...state, [stateKeys]: parsedLine[1] };
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
