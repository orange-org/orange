// import nock from "nock";
// import { ErrorWithCode } from "_c/ErrorWithCode";
// import { HttpRequest } from "./HttpRequest";

// const RPC_SERVER_URL = "http://localhost:8332/";

// const rpcConfigurations = {
//   username: "1",
//   password: "1",
//   serverUrl: RPC_SERVER_URL,
// };

// describe("MainRpcClient", () => {
//   it("relays the response from Bitcoin Core", async () => {
//     nock(RPC_SERVER_URL)
//       .post("/")
//       .reply(200, {
//         result: "whatever bitcoind responds",
//       });

//     const response = await HttpRequest.call(
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

//     const response = await HttpRequest.call(
//       {
//         method: "getblockhash",
//         params: [600000],
//       },
//       rpcConfigurations,
//     );

//     expect(response.error).toBe("whatever bitcoind puts in error key");
//   });

//   it("throws when statusCode is 401 or 403", async () => {
//     nock(RPC_SERVER_URL)
//       .post("/")
//       .reply(403);

//     await expect(
//       HttpRequest.call(
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
