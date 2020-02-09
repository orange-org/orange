import { RpcResponseMtR } from "_t/IpcMessages";
import { rpcClient } from "./rpcClient";

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
          type: "rpc-response",
          message: {
            result: "foo",
            requestId: event.data.message.requestId,
            method: "getblockhash",
            error: null,
          },
          source: "@orange/main",
        };

        window.postMessage(rpcResponse, "*");

        window.removeEventListener("message", messageHandler);
      }
    };

    window.addEventListener("message", messageHandler);

    const result = await rpcClient(__NONCE__, { method: "getblockhash" });

    expect(result).toEqual("foo");
  });

  it("returns the results from a cache if a repeated request is made within a cache period", async () => {
    const messageHandler = (event: MessageEvent) => {
      if (event.data.source === "@orange/renderer") {
        const rpcResponse: RpcResponseMtR = {
          nonce: __NONCE__,
          type: "rpc-response",
          message: {
            result: "this will be cached",
            requestId: event.data.message.requestId,
            method: "getblockhash",
            error: null,
          },
          source: "@orange/main",
        };

        window.postMessage(rpcResponse, "*");

        window.removeEventListener("message", messageHandler);
      }
    };
    window.addEventListener("message", messageHandler);

    await rpcClient(__NONCE__, { method: "getblockhash" }, 1);

    const messageHandler2 = (event: MessageEvent) => {
      if (event.data.source === "@orange/renderer") {
        const rpcResponse: RpcResponseMtR = {
          nonce: __NONCE__,
          type: "rpc-response",
          message: {
            result: "this will not be returned",
            requestId: event.data.message.requestId,
            method: "getblockhash",
            error: null,
          },
          source: "@orange/main",
        };

        window.postMessage(rpcResponse, "*");
      }
    };
    window.addEventListener("message", messageHandler2);

    const result2 = await rpcClient(__NONCE__, { method: "getblockhash" }, 1);

    expect(result2).toEqual("this will be cached");
    window.removeEventListener("message", messageHandler2);
  });

  it("returns fresh results if cache expired", async () => {
    const messageHandler = (event: MessageEvent) => {
      if (event.data.source === "@orange/renderer") {
        const rpcResponse: RpcResponseMtR = {
          nonce: __NONCE__,
          type: "rpc-response",
          message: {
            result: "this will be expired",
            requestId: event.data.message.requestId,
            method: "getblockhash",
            error: null,
          },
          source: "@orange/main",
        };

        window.postMessage(rpcResponse, "*");
        window.removeEventListener("message", messageHandler);
      }
    };
    window.addEventListener("message", messageHandler);

    await rpcClient(__NONCE__, { method: "getblockhash" }, 1);

    const messageHandler2 = (event: MessageEvent) => {
      if (event.data.source === "@orange/renderer") {
        const rpcResponse: RpcResponseMtR = {
          nonce: __NONCE__,
          type: "rpc-response",
          message: {
            result: "this will be returned",
            requestId: event.data.message.requestId,
            method: "getblockhash",
            error: null,
          },
          source: "@orange/main",
        };

        window.postMessage(rpcResponse, "*");

        window.removeEventListener("message", messageHandler2);
      }
    };
    window.addEventListener("message", messageHandler2);

    jest.advanceTimersByTime(100);

    const result2 = await rpcClient(__NONCE__, { method: "getblockhash" }, 2);

    expect(result2).toEqual("this will be returned");
  });

  it("returns an error if error is not null", async () => {
    const messageHandler = (event: MessageEvent) => {
      if (event.data.source === "@orange/renderer") {
        const rpcResponse: RpcResponseMtR = {
          nonce: __NONCE__,
          type: "rpc-response",
          message: {
            result: null,
            requestId: event.data.message.requestId,
            method: "getblockhash",
            error: { code: 1, message: "error happened" },
          },
          source: "@orange/main",
        };

        window.postMessage(rpcResponse, "*");

        window.removeEventListener("message", messageHandler);
      }
    };
    window.addEventListener("message", messageHandler);

    try {
      await rpcClient(__NONCE__, { method: "getblockhash" });
    } catch (e) {
      expect(e).toEqual({ code: 1, message: "error happened" });
    }
  });
});
