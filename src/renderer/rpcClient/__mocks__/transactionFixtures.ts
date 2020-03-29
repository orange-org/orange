import { RawTransaction } from "_t/bitcoindRpcResponses";

export const rawTransactionFixture1: RawTransaction = {
  txid: "d1a52e20fa7108aeeb678f669210c4f5ad0135b3b18aa6081a9712c4172a9524",
  hash: "0d45cb374ce2d7a23ee680434471adbad3a82eceb6462a0b2fdc2588299e99f8",
  version: 2,
  size: 247,
  vsize: 166,
  weight: 661,
  locktime: 1665196,
  vin: [
    {
      txid: "055ae2fc29c95fbdd2386390fd0cf060689e5140f73644584848547094cc01f7",
      vout: 1,
      scriptSig: {
        asm: "0014d02f2e21582d7090916841d18ea3529aaada2bdc",
        hex: "160014d02f2e21582d7090916841d18ea3529aaada2bdc",
      },
      txinwitness: [
        "30440220677763f87b0f71d3bb1f379874248b64266db3a5f0755a41ef03dcd4a47f43cc0220560d9a49bb94c8047c0340b9c6af0db83cc2c04c108b46d1651fdbe983bbfc2201",
        "02a6733468894072756cecad80aca40a8ea94ca523e5863eed347d7db2641c0590",
      ],
      sequence: 4294967294,
    },
  ],
  vout: [
    {
      value: 44.29575037,
      n: 0,
      scriptPubKey: {
        asm: "OP_HASH160 ddcc8c597f5a1d4dc205dc99d44f0650f7569e31 OP_EQUAL",
        hex: "a914ddcc8c597f5a1d4dc205dc99d44f0650f7569e3187",
        reqSigs: 1,
        type: "scripthash",
        addresses: ["2NDTzMwSNA1JfzG6C8zeWzHSXniyrBD2JJp"],
      },
    },
    {
      value: 0.01146106,
      n: 1,
      scriptPubKey: {
        asm: "OP_HASH160 c6953485b2606555e27983b6d8db83ce3320da96 OP_EQUAL",
        hex: "a914c6953485b2606555e27983b6d8db83ce3320da9687",
        reqSigs: 1,
        type: "scripthash",
        addresses: ["2NBMEXDtPK8EyJ7omvVMQCVoa4JEYtieBuV"],
      },
    },
  ],
  hex:
    "02000000000101f701cc9470544848584436f740519e6860f00cfd906338d2bd5fc929fce25a050100000017160014d02f2e21582d7090916841d18ea3529aaada2bdcfeffffff027df305080100000017a914ddcc8c597f5a1d4dc205dc99d44f0650f7569e3187fa7c11000000000017a914c6953485b2606555e27983b6d8db83ce3320da9687024730440220677763f87b0f71d3bb1f379874248b64266db3a5f0755a41ef03dcd4a47f43cc0220560d9a49bb94c8047c0340b9c6af0db83cc2c04c108b46d1651fdbe983bbfc22012102a6733468894072756cecad80aca40a8ea94ca523e5863eed347d7db2641c0590ac681900",
  blockhash: "000000000000000096cd6c9c1a3b88242dd8646d0c3da6a819b49da9868a5efc",
  confirmations: 10039,
  time: 1581101265,
  blocktime: 1581101265,
};

export const rawTransactionFixture2 = {
  txid: "055ae2fc29c95fbdd2386390fd0cf060689e5140f73644584848547094cc01f7",
  hash: "08b50cf96f80de1163ca717467412143aa7270eee37222516b736531508e1afa",
  version: 2,
  size: 247,
  vsize: 166,
  weight: 661,
  locktime: 1665248,
  vin: [
    {
      txid: "1bc157e6a67b8be61a714beaf4d8cbe70c29b4c64e8fda08815c1f53a33c26b8",
      vout: 0,
      scriptSig: {
        asm: "00149b81864d1803ca470c484388c7297e8ec6b67c5f",
        hex: "1600149b81864d1803ca470c484388c7297e8ec6b67c5f",
      },
      txinwitness: [
        "304402207075d0dff1533b4bc273ee7916e4aa10c4ad6482d6be4e95e4ec0e83eb45deda02203b50c9b405eb1dc5b9f313e1674b8da877845b4692a4b11a7384235a0f6a403101",
        "0345ab4b0525d17f06228b92dfaee8b3c6ccdc800600a5e8b7f93e3bc6d4ea8229",
      ],
      sequence: 4294967294,
    },
  ],
  vout: [
    {
      value: 0.01800686,
      n: 0,
      scriptPubKey: {
        asm: "OP_HASH160 704ddcfeafe8594d89b4c8bac8c9f7396279c1a9 OP_EQUAL",
        hex: "a914704ddcfeafe8594d89b4c8bac8c9f7396279c1a987",
        reqSigs: 1,
        type: "scripthash",
        addresses: ["2N3V2woYCF76Q9fTGUES19GkFmyryFzNXs6"],
      },
    },
    {
      value: 44.30737943,
      n: 1,
      scriptPubKey: {
        asm: "OP_HASH160 618024319042c065c05d534ea23061fddbf0a7a4 OP_EQUAL",
        hex: "a914618024319042c065c05d534ea23061fddbf0a7a487",
        reqSigs: 1,
        type: "scripthash",
        addresses: ["2N28m3JyezyfnfTtpKjMRiQvK9YAkqhFvn9"],
      },
    },
  ],
  hex:
    "02000000000101b8263ca3531f5c8108da8f4ec6b4290ce7cbd8f4ea4b711ae68b7ba6e657c11b00000000171600149b81864d1803ca470c484388c7297e8ec6b67c5ffeffffff02ee791b000000000017a914704ddcfeafe8594d89b4c8bac8c9f7396279c1a98717b217080100000017a914618024319042c065c05d534ea23061fddbf0a7a4870247304402207075d0dff1533b4bc273ee7916e4aa10c4ad6482d6be4e95e4ec0e83eb45deda02203b50c9b405eb1dc5b9f313e1674b8da877845b4692a4b11a7384235a0f6a403101210345ab4b0525d17f06228b92dfaee8b3c6ccdc800600a5e8b7f93e3bc6d4ea8229e0681900",
  blockhash: "00000000627b5e3eb15a42b39687572e3fa5832786b5c15e46c6164fdedcb1af",
  confirmations: 24963,
  time: 1581101404,
  blocktime: 1581101404,
};
