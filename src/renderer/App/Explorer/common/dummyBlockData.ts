import { Block } from "_t/RpcResponses";
import { range, pad } from "lodash";

export const dummyBlockData: Block = {
  bits: "1a0155de",
  chainwork: "000000000000000000000000000000000000000000000140bf0116a01add88d5",
  confirmations: 1,
  difficulty: 12563071.03178775,
  hash: "0000000000000000000000000000000000000000000000000000000000000000",
  height: 1001000,
  mediantime: 1580599789,
  merkleroot:
    "0000000000000000000000000000000000000000000000000000000000000000", // use isDummyBlockData to detect
  nonce: 3247988372,
  previousblockhash:
    "000000000000014da63868cd0618f76cd7b46aee4baec51e5f1b7b5c21a74540",
  size: 17246,
  strippedsize: 10550,
  time: 1580602067,
  tx: [
    "5e97b31f2905baf0bf400fe94e7d8b42be9ff8e47ddf4c8c52dcdf0fc33dad5a",
    "d00ba21708b82e51e54f7cd2e88a4d8deed59ce4c5a685dd45642cb84185f194",
    "b756675416b56a6ffe5b3773fed0bf48315e060fdfff2807ed8196c7e3133c17",
    "7c46362774e072a841387845f2eecb25e5557d0d1e0f56d850de22342b17d90c",
    "bd739b5b65ee7c092dcabec0ce26e609eff53aa461f83103c990f0c29374ffe3",
    "dcadb8076cb4c5dff331505106936ae8404c34f0e6fd972ab7e892b6d100893e",
    "235811d0d8e07c68ee759e0000e98c505471681da5eac5cccab9efa6aa32e03c",
    "4773cf0218e31a0cf344920aa70b509efb18a5affff53796496ff99ee839743f",
    "57fe8cca77bbe99d0c0d4c752fabea22b1e4f779a4934bdd3ca51dd83c6c754a",
  ],
  version: 549453824,
  versionHex: "20c00000",
  weight: 48896,
};

export const dummyBlockList = range(0, 20).map(index => ({
  ...dummyBlockData,
  hash: pad(index.toString(10), 64),
}));
