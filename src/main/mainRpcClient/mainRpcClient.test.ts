import nock from "nock";
import { ErrorWithCode } from "_c/ErrorWithCode";
import { mainRpcClient } from "_m/mainRpcClient/mainRpcClient";

const RPC_SERVER_URL = "http://localhost:8332/";

const rpcConfigurations = {
  username: "1",
  password: "1",
  serverUrl: RPC_SERVER_URL,
};

describe("mainRpcClient", () => {
  it("relays the response from Bitcoin Core", async () => {
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

  it("relays the error from Bitcoin Core", async () => {
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

  it("throws for non-whitelisted RPC methods", async () => {
    const scope = nock(RPC_SERVER_URL)
      .post("/")
      .reply(200, { result: "okay" });

    await expect(
      mainRpcClient(
        {
          // @ts-ignore
          method: "submitheader",
          requestId: "123",
        },
        rpcConfigurations,
      ),
    ).rejects.toThrow(ErrorWithCode);
    expect(scope.pendingMocks().length).toBe(1);

    nock.cleanAll();
  });
});
