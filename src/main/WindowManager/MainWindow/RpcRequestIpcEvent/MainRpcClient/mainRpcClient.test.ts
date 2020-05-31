// import nock from "nock";
// import { ErrorWithCode } from "_c/ErrorWithCode";
// import { mainRpcClient } from "_m/MainRpcClient/MainRpcClient";

// const RPC_SERVER_URL = "http://localhost:8332/";

// const rpcConfigurations = {
//   username: "1",
//   password: "1",
//   serverUrl: RPC_SERVER_URL,
// };

// describe("mainRpcClient", () => {
//   it("relays the response from Bitcoin Core", async () => {
//     nock(RPC_SERVER_URL)
//       .post("/")
//       .reply(200, {
//         result: "whatever bitcoind responds",
//       });

//     const response = await mainRpcClient.call(
//       {
//         method: "getblockhash",
//         params: [600000],
//       },
//       rpcConfigurations,
//     );

//     expect(response.result).toBe("whatever bitcoind responds");
//   });

//   it("relays the error from Bitcoin Core", async () => {
//     nock(RPC_SERVER_URL)
//       .post("/")
//       .reply(200, {
//         error: "whatever bitcoind puts in error key",
//       });

//     const response = await MainRpcClient(
//       {
//         method: "getblockhash",
//         params: [600000],
//       },
//       rpcConfigurations,
//     );

//     expect(response.error).toBe("whatever bitcoind puts in error key");
//   });

//   it("throws for non-whitelisted RPC methods", async () => {
//     const scope = nock(RPC_SERVER_URL)
//       .post("/")
//       .reply(200, { result: "okay" });

//     await expect(
//       MainRpcClient(
//         {
//           // @ts-ignore
//           method: "submitheader",
//         },
//         rpcConfigurations,
//       ),
//     ).rejects.toThrow(ErrorWithCode);
//     expect(scope.pendingMocks().length).toBe(1);

//     nock.cleanAll();
//   });

//   it("throws when statusCode is 401 or 403", async () => {
//     nock(RPC_SERVER_URL)
//       .post("/")
//       .reply(403);

//     await expect(
//       MainRpcClient(
//         {
//           method: "getblockhash",
//           params: [600000],
//         },
//         rpcConfigurations,
//       ),
//     ).rejects.toThrow(ErrorWithCode);

//     nock.cleanAll();
//   });
// });
