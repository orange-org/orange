export type MessageFromMain<MessageType> = {
  source: "@orange/main";
  type: string;
  nonce: string;
  message: MessageType;
};
