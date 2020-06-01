import { ipcService as ipcService_ } from "_r/IpcService/IpcService";
import { RpcClient as RpcClient_ } from "./RpcClient";

const { RpcClient } = jest.requireActual("./RpcClient") as {
  RpcClient: typeof RpcClient_;
};

const ipcService = ipcService_ as any;

jest.mock("_r/ipc/IpcService", () => ({
  ipcService: {
    rpcRequest: jest.fn(),
  },
}));

describe("rpcClient", () => {
  afterEach(() => {
    jest.runAllTimers();
  });

  it("returns results for an RPC request", async () => {
    ipcService.rpcRequest.mockImplementation(() => ({
      result: "foo",
      method: "getblockhash",
      error: null,
    }));

    const result = await RpcClient.send(__NONCE__, {
      method: "getblockhash",
      params: [1],
    });

    expect(result).toEqual("foo");
  });

  it("returns the results from a cache if a repeated request is made within a cache period", async () => {
    ipcService.rpcRequest.mockImplementation(() => ({
      result: "this will be cached",
      method: "getblockhash",
      error: null,
    }));

    await RpcClient.send(__NONCE__, { method: "getblockhash", params: [1] }, 1);

    ipcService.rpcRequest.mockImplementation(() => ({
      result: "this will not be returned",
      method: "getblockhash",
      error: null,
    }));

    const result2 = await RpcClient.send(
      __NONCE__,
      { method: "getblockhash", params: [1] },
      1,
    );

    expect(result2).toEqual("this will be cached");
  });

  it("returns fresh results if cache expired", async () => {
    ipcService.rpcRequest.mockImplementation(() => ({
      result: "this will be expired",
      method: "getblockhash",
      error: null,
    }));
    await RpcClient.send(__NONCE__, { method: "getblockhash", params: [1] }, 1);

    jest.advanceTimersByTime(100);

    ipcService.rpcRequest.mockImplementation(() => ({
      result: "this will be returned",
      method: "getblockhash",
      error: null,
    }));
    const result2 = await RpcClient.send(
      __NONCE__,
      { method: "getblockhash", params: [1] },
      2,
    );

    expect(result2).toEqual("this will be returned");
  });

  it("throws an error if error is not fixable", async () => {
    ipcService.rpcRequest.mockImplementation(() => ({
      result: null,
      method: "getblockhash",
      // @ts-ignore
      error: "huh?",
    }));

    try {
      await RpcClient.send(__NONCE__, { method: "getblockhash", params: [1] });
    } catch (e) {
      expect(e).toEqual("huh?");
    }
  });
});
