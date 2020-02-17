import nock from "nock";
import { sendRpcRequestToBitcoind } from "_m/sendRpcRequestToBitcoind/sendRpcRequestToBitcoind";
import { RPC_SERVER_URL, ERROR_CODES } from "_c/constants";

jest.mock("_m/getRpcCredentials", () => ({
  getRpcCredentials: () => ({
    username: "__cookie__",
    password: "123",
  }),
}));

describe("sendRpcRequestToBitcoind", () => {
  it("relays the response from `bitcoind`", async () => {
    nock(RPC_SERVER_URL)
      .post("/")
      .reply(200, {
        result: "whatever bitcoind responds",
      });

    const response = await sendRpcRequestToBitcoind({
      method: "getblockhash",
      params: [600000],
      requestId: "123",
    });

    expect(response.result).toBe("whatever bitcoind responds");
  });

  it("relays the error from `bitcoind`", async () => {
    nock(RPC_SERVER_URL)
      .post("/")
      .reply(200, {
        error: "whatever bitcoind puts in error key",
      });

    const response = await sendRpcRequestToBitcoind({
      method: "getblockhash",
      params: [600000],
      requestId: "123",
    });

    expect(response.error).toBe("whatever bitcoind puts in error key");
  });

  it("reports problems with parsing JSON response", async () => {
    nock(RPC_SERVER_URL)
      .post("/")
      .reply(200, "{json?");

    const response = await sendRpcRequestToBitcoind({
      method: "getblockchaininfo",
      requestId: "123",
    });

    expect(response.error).toEqual({
      code: ERROR_CODES.jsonParse,
      message: "",
    });
  });

  it("reports problems with making the request", async () => {
    nock(RPC_SERVER_URL)
      .post("/")
      .replyWithError("whatever the request error is");

    const response = await sendRpcRequestToBitcoind({
      method: "getblockchaininfo",
      requestId: "123",
    });

    expect(response.error).toEqual({
      code: ERROR_CODES.rpcRequestError,
      message: "",
      payload: new Error("whatever the request error is"),
    });
  });

  it("rejects non-whitelisted RPC methods", async () => {
    const scope = nock(RPC_SERVER_URL)
      .post("/")
      .reply(200, { result: "okay" });

    const response = await sendRpcRequestToBitcoind({
      // @ts-ignore
      method: "submitheader",
      requestId: "123",
    });

    expect(response.error).toEqual({ code: ERROR_CODES.rpcMethodNotAllowed });
    expect(scope.pendingMocks().length).toBe(1);

    nock.cleanAll();
  });
});
