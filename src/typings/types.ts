export type Json = { [name: string]: string };

export type MessageToRenderer<MessageType> = {
  nonce: NONCE;
  source: "@orange/main";
  type: "system-preference" | "bitcoind-line" | "rpc-response";
  message: MessageType;
};

export type MessageToMain<MessageType> = {
  nonce: NONCE;
  source: "@orange/renderer";
  type: "rpc-request";
  message: MessageType;
};
