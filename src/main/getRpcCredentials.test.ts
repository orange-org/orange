import { vol } from "memfs";
import { getGlobalProcess as getGlobalProcess_ } from "_m/getGlobalProcess";
import { merge } from "lodash";
import { getRpcCredentials } from "./getRpcCredentials";
import { getStore as getStore_ } from "./getStore";

const getGlobalProcess = getGlobalProcess_ as jest.Mock;
const getStore = getStore_ as jest.Mock;

export const setupProcessVariables = (processVariables: {
  platform: string;
  env: {
    APPDATA?: string;
    HOME?: string;
  };
}) => {
  getGlobalProcess.mockImplementation(() =>
    merge({ ...process }, processVariables),
  );
};

describe("getRpcCredentials", () => {
  test("retrieving authentication cookie on Windows", async () => {
    setupProcessVariables({
      platform: "win32",
      env: {
        APPDATA: "appData",
      },
    });

    vol.fromJSON({
      "appData/Bitcoin/bitcoin.conf": "",
      "appData/Bitcoin/.cookie": "__cookie__:123123",
    });

    expect(await getRpcCredentials()).toEqual({
      username: "__cookie__",
      password: "123123",
    });
  });

  test("retrieving authentication cookie on Mac", async () => {
    setupProcessVariables({
      platform: "darwin",
      env: {
        HOME: "home",
      },
    });

    vol.fromJSON({
      "home/Library/Application Support/Bitcoin/bitcoin.conf": "",
      "home/Library/Application Support/Bitcoin/.cookie": "__cookie__:424242",
    });

    expect(await getRpcCredentials()).toEqual({
      username: "__cookie__",
      password: "424242",
    });
  });

  test("retrieving authentication cookie on Linux", async () => {
    setupProcessVariables({
      platform: "anything other than win32 or darwin",
      env: {
        HOME: "home",
      },
    });

    vol.fromJSON({
      "home/.bitcoin/bitcoin.conf": "",
      "home/.bitcoin/.cookie": "__cookie__:1337",
    });

    expect(await getRpcCredentials()).toEqual({
      username: "__cookie__",
      password: "1337",
    });
  });

  [
    ["testnet", "testnet3", "1234"],
    ["regtest", "regtest", "5678"],
  ].forEach(([networkName, dirName, password]) => {
    test(`retrieving auth cookie for ${networkName} configurations`, async () => {
      vol.fromJSON({
        "home/.bitcoin/bitcoin.conf": `${networkName}=1`,
        [`home/.bitcoin/${dirName}/.cookie`]: `__cookie__:${password}`,
      });

      expect(await getRpcCredentials()).toEqual({
        username: "__cookie__",
        password,
      });
    });
  });

  test("caching credentials", async () => {
    /**
     * Here we manually add values to the memory cache.
     * `getRpcCredentials` will use these values instead
     * of retrieving the values in the file system.
     */
    getStore.mockImplementation(() => ({
      username: "__cookie__",
      password: "c4ch3",
    }));

    vol.fromJSON({
      "home/.bitcoin/bitcoin.conf": "",
      "home/.bitcoin/.cookie": "__cookie__:bar",
    });

    expect(await getRpcCredentials()).toEqual({
      username: "__cookie__",
      password: "c4ch3",
    });
  });
});
