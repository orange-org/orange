export class Constants {
  static coreRpcError = {
    /**
     * The below codes map to:
     * https://github.com/bitcoin/bitcoin/blob/75fb37ce68289eb7e00e2ccdd2ef7f9271332545/src/rpc/protocol.h#L39
     */
    warmingUp: -28,
    invalidParameter: -8,
    miscError: -1,
    blockNotFound: -5,
  } as const;

  static nodeError = {
    ECONNREFUSED: "ECONNREFUSED",
    ENOTFOUND: "ENOTFOUND",
  } as const;

  static error = {
    general: 5001,
  } as const;

  static defaultServerUrl = "http://127.0.0.1:8332";

  static b = "₿";
}
