import { RpcResponseMtR } from "_t/IpcMessages";
import { RPC_ERROR } from "_c/constants";
import { rpcClient as rpcClient_ } from "./rpcClient";

const { rpcClient } = jest.requireActual("./rpcClient") as {
  rpcClient: typeof rpcClient_;
};

jest.useFakeTimers();

describe("rpcClient", () => {
  afterEach(() => {
    jest.runAllTimers();
  });

  it("returns results for an RPC request", async () => {
    const messageHandler = (event: MessageEvent) => {
      if (event.data.source === "@orange/renderer") {
        const rpcResponse: RpcResponseMtR = {
          nonce: __NONCE__,
          type: "rpc-request",
          message: {
            result: "foo",
            method: "getblockhash",
            error: null,
          },
        };

        window.postMessage(rpcResponse, "*");

        window.removeEventListener("message", messageHandler);
      }
    };

    window.addEventListener("message", messageHandler);

    const result = await rpcClient(__NONCE__, {
      method: "getblockhash",
      params: [1],
    });

    expect(result).toEqual("foo");
  });

  it("returns the results from a cache if a repeated request is made within a cache period", async () => {
    const messageHandler = (event: MessageEvent) => {
      if (event.data.source === "@orange/renderer") {
        const rpcResponse: RpcResponseMtR = {
          nonce: __NONCE__,
          type: "rpc-request",
          message: {
            result: "this will be cached",
            method: "getblockhash",
            error: null,
          },
        };

        window.postMessage(rpcResponse, "*");

        window.removeEventListener("message", messageHandler);
      }
    };
    window.addEventListener("message", messageHandler);

    await rpcClient(__NONCE__, { method: "getblockhash", params: [1] }, 1);

    const messageHandler2 = (event: MessageEvent) => {
      if (event.data.source === "@orange/renderer") {
        const rpcResponse: RpcResponseMtR = {
          nonce: __NONCE__,
          type: "rpc-request",
          message: {
            result: "this will not be returned",
            method: "getblockhash",
            error: null,
          },
        };

        window.postMessage(rpcResponse, "*");
      }
    };
    window.addEventListener("message", messageHandler2);

    const result2 = await rpcClient(
      __NONCE__,
      { method: "getblockhash", params: [1] },
      1,
    );

    expect(result2).toEqual("this will be cached");
    window.removeEventListener("message", messageHandler2);
  });

  it("returns fresh results if cache expired", async () => {
    const messageHandler = (event: MessageEvent) => {
      if (event.data.source === "@orange/renderer") {
        const rpcResponse: RpcResponseMtR = {
          nonce: __NONCE__,
          type: "rpc-request",
          message: {
            result: "this will be expired",
            method: "getblockhash",
            error: null,
          },
        };

        window.postMessage(rpcResponse, "*");
        window.removeEventListener("message", messageHandler);
      }
    };
    window.addEventListener("message", messageHandler);

    await rpcClient(__NONCE__, { method: "getblockhash", params: [1] }, 1);

    const messageHandler2 = (event: MessageEvent) => {
      if (event.data.source === "@orange/renderer") {
        const rpcResponse: RpcResponseMtR = {
          nonce: __NONCE__,
          type: "rpc-request",
          message: {
            result: "this will be returned",
            method: "getblockhash",
            error: null,
          },
        };

        window.postMessage(rpcResponse, "*");

        window.removeEventListener("message", messageHandler2);
      }
    };
    window.addEventListener("message", messageHandler2);

    jest.advanceTimersByTime(100);

    const result2 = await rpcClient(
      __NONCE__,
      { method: "getblockhash", params: [1] },
      2,
    );

    expect(result2).toEqual("this will be returned");
  });

  it("returns an error if error is not null", async () => {
    const messageHandler = (event: MessageEvent) => {
      if (event.data.source === "@orange/renderer") {
        const rpcResponse: RpcResponseMtR = {
          nonce: __NONCE__,
          type: "rpc-request",
          message: {
            result: null,
            method: "getblockhash",
            error: {
              code: RPC_ERROR.couldNotOpenBitcoinConf,
              message: "error happened",
            },
          },
        };

        window.postMessage(rpcResponse, "*");

        window.removeEventListener("message", messageHandler);
      }
    };
    window.addEventListener("message", messageHandler);

    try {
      await rpcClient(__NONCE__, { method: "getblockhash", params: [1] });
    } catch (e) {
      expect(e).toEqual({ code: 1, message: "error happened" });
    }
  });
});
