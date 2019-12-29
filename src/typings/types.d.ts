export type MessageFromMain<MessageType> = {
  nonce: __NONCE__;
  source: "@orange/main";
  type: "system-preference" | "bitcoind-line" | "bitcoind-rpc-success-response";
  message: MessageType;
};

export type RpcRequest = {
  nonce: __NONCE__;
  source: "@orange/renderer";
  method: "getnetworkinfo";
  params?: string[];
};

export type RpcResponse = any;
