import { BlockchainInfo } from "src/data/node_modules/_r/typings/RpcResponses";

export const blockchainInfoFixture1: BlockchainInfo = {
  chain: "test",
  blocks: 20,
  headers: 20,
  bestblockhash:
    "00000000000000daf54a28b5ddff93a8ab735effeee8b917a2d0ec72ac02dc66",
  difficulty: 10474471.99230249,
  mediantime: 1581097866,
  verificationprogress: 0.9999981742967339,
  initialblockdownload: false,
  chainwork: "000000000000000000000000000000000000000000000141d772023e6ac265b9",
  size_on_disk: 26423342520,
  pruned: false,
  softforks: {
    bip34: {
      type: "buried",
      active: true,
      height: 21111,
    },
    bip66: {
      type: "buried",
      active: true,
      height: 330776,
    },
    bip65: {
      type: "buried",
      active: true,
      height: 581885,
    },
    csv: {
      type: "buried",
      active: true,
      height: 770112,
    },
    segwit: {
      type: "buried",
      active: true,
      height: 834624,
    },
  },
  warnings: "Warning: unknown new rules activated (versionbit 28)",
};
