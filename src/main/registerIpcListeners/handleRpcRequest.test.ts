import { vol } from "memfs";
import nock from "nock";
import {
  initializeElectronCode,
  PASSWORD,
  USERNAME,
  SERVER_URL,
} from "_m/startMainProcess.testHelpers";
import { callMain } from "_r/ipc/callMain";

describe("handleRpcRequest", () => {
  beforeAll(() => {
    initializeElectronCode();
  });

  /**
   * Orange allows the user to try different RPC configurations before saving
   * them. To enable that, the `rpc-request` message can add a key called
   * `connectionConfigurations` that contains the RPC configurations to be tested.
   * If `connectionConfigurations` is `null`, that tells the handler to try
   * the default configurations.
   */
  test("Trying default configurations", async () => {
    const scope = nock("http://localhost:8332", {
      reqheaders: {
        authorization: `Basic ${btoa(`${USERNAME}:${PASSWORD}`)}`,
      },
    })
      .post("/")
      .reply(200, {});

    await callMain({
      nonce: __NONCE__,
      type: "rpc-request",
      payload: {
        method: "getblockchaininfo",
        connectionConfigurations: null,
      },
    });

    expect(() => scope.isDone()).not.toThrow();
  });

  /**
   * Instead of trying the default configurations, the user can supply a
   * specific username and password to try
   */
  test("Trying a specific username and password", async () => {
    const username = "cookiez!";
    const password = "bazzword";

    const scope = nock("http://localhost:8332", {
      reqheaders: {
        authorization: `Basic ${btoa(`${username}:${password}`)}`,
      },
    })
      .post("/")
      .reply(200, {});

    await callMain({
      nonce: __NONCE__,
      type: "rpc-request",
      payload: {
        method: "getblockchaininfo",
        connectionConfigurations: {
          username,
          password,
          serverUrl: SERVER_URL,
        },
      },
    });

    expect(() => scope.isDone()).not.toThrow();
  });

  /**
   * The user can specify a custom `.cookie` file location
   */
  test("Trying a custom cookie file location", async () => {
    const username = "mycookiez!";
    const password = "moarbazzword";
    const cookieFile = "home/.bitcoin/.mycookiez";

    vol.fromJSON({
      [cookieFile]: `${USERNAME}:${PASSWORD}`,
    });

    const scope = nock("http://localhost:8332", {
      reqheaders: {
        authorization: `Basic ${btoa(`${username}:${password}`)}`,
      },
    })
      .post("/")
      .reply(200, {});

    await callMain({
      nonce: __NONCE__,
      type: "rpc-request",
      payload: {
        method: "getblockchaininfo",
        connectionConfigurations: {
          cookieFile,
          serverUrl: SERVER_URL,
        },
      },
    });

    expect(() => scope.isDone()).not.toThrow();
  });
});
