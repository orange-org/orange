import { ObjectValues } from "_t/typeHelpers";

export const BITCOIN_CORE_RPC_ERROR = {
  /**
   * The below codes map to:
   * https://github.com/bitcoin/bitcoin/blob/75fb37ce68289eb7e00e2ccdd2ef7f9271332545/src/rpc/protocol.h#L39
   */
  warmingUp: -28,
  invalidParameter: -8,
  miscError: -1,
  blockNotFound: -5,
} as const;

export const NODE_ERROR = {
  ECONNREFUSED: "ECONNREFUSED",
} as const;

export const RPC_ERROR = {
  methodNotAllowedByMainProcess: 5004,
  couldNotOpenBitcoinConf: 5005,
  couldNotOpenCookieFile: 5006,
  unauthorized: 5007,
} as const;

export const ERROR = {
  general: 5001,
  jsonParse: 5002,
} as const;

export type ErrorCode = ObjectValues<typeof ERROR>;
