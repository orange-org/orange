export type Json = { [name: string]: string };

export type MessageFromMain<MessageType> = {
  nonce: __NONCE__;
  source: "@orange/main";
  type: "system-preference" | "bitcoind-line" | "rpc-response";
  message: MessageType;
};

export type MessageFromRenderer<MessageType> = {
  nonce: __NONCE__;
  source: "@orange/renderer";
  type: "rpc-request";
  message: MessageType;
};
