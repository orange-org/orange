export const RPC_SERVER_ERROR_CODES = {
  /**
   * The below codes map to:
   * https://github.com/bitcoin/bitcoin/blob/75fb37ce68289eb7e00e2ccdd2ef7f9271332545/src/rpc/protocol.h#L39
   */
  warmingUp: -28,
  rpcInvalidParameter: -8,
  rpcMiscError: -1,
};

export const ERROR_CODES = {
  general: 5001,
  jsonParse: 5002,
  rpcRequestError: 5003,
};

export const RPC_SERVER_URL = "http://localhost:18332/";
