import nock from "nock";
import { mainRpcClient } from "_m/mainRpcClient/mainRpcClient";
import { ERROR, RPC_ERROR } from "_c/constants";

jest.mock("_m/getRpcCredentials", () => {
  return {
    getRpcCredentials: () => {
      return {
        username: "__cookie__",
        password: "123",
        port: 8332,
      };
    },
  };
});

const RPC_SERVER_URL = "http://localhost:8332/";

const rpcConfigurations = {
  username: "",
  password: "",
  serverUrl: "",
};

describe("sendRpcRequestToBitcoind", () => {
  it("relays the response from `bitcoind`", async () => {
    nock(RPC_SERVER_URL)
      .post("/")
      .reply(200, {
        result: "whatever bitcoind responds",
      });

    const response = await mainRpcClient(
      {
        method: "getblockhash",
        params: [600000],
        requestId: "123",
      },
      rpcConfigurations,
    );

    expect(response.result).toBe("whatever bitcoind responds");
  });

  it("relays the error from `bitcoind`", async () => {
    nock(RPC_SERVER_URL)
      .post("/")
      .reply(200, {
        error: "whatever bitcoind puts in error key",
      });

    const response = await mainRpcClient(
      {
        method: "getblockhash",
        params: [600000],
        requestId: "123",
      },
      rpcConfigurations,
    );

    expect(response.error).toBe("whatever bitcoind puts in error key");
  });

  it("reports problems with parsing JSON response", async () => {
    nock(RPC_SERVER_URL)
      .post("/")
      .reply(200, "{json?");

    const response = await mainRpcClient(
      {
        method: "getblockchaininfo",
        requestId: "123",
      },
      rpcConfigurations,
    );

    expect(response.error).toEqual({
      code: ERROR.jsonParse,
      message: "",
    });
  });

  it("reports problems with making the request", async () => {
    nock(RPC_SERVER_URL)
      .post("/")
      .replyWithError("whatever the request error is");

    const response = await mainRpcClient(
      {
        method: "getblockchaininfo",
        requestId: "123",
      },
      rpcConfigurations,
    );

    expect(response.error).toEqual({
      // code: RPC_ERROR.rpcRequestError,
      message: "",
      payload: new Error("whatever the request error is"),
    });
  });

  it("rejects non-whitelisted RPC methods", async () => {
    const scope = nock(RPC_SERVER_URL)
      .post("/")
      .reply(200, { result: "okay" });

    const response = await mainRpcClient(
      {
        // @ts-ignore
        method: "submitheader",
        requestId: "123",
      },
      rpcConfigurations,
    );

    expect(response.error).toEqual({
      code: RPC_ERROR.methodNotAllowedByMainProcess,
    });
    expect(scope.pendingMocks().length).toBe(1);

    nock.cleanAll();
  });
});
