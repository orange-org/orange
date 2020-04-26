import { vol } from "memfs";
import { getGlobalProcess as getGlobalProcess_ } from "_m/getGlobalProcess";
import { merge } from "lodash";
import { getRpcConfigurationsFromDisk } from "./getRpcConfigurationsFromDisk";

const getGlobalProcess = getGlobalProcess_ as jest.Mock;

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
  afterEach(() => {
    vol.reset();
  });

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

    expect(await getRpcConfigurationsFromDisk()).toEqual({
      serverUrl: "http://localhost:8332",
      username: "__cookie__",
      password: "123123",
      cookieFile: "appData/Bitcoin/.cookie",
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

    expect(await getRpcConfigurationsFromDisk()).toEqual({
      serverUrl: "http://localhost:8332",
      username: "__cookie__",
      password: "424242",
      cookieFile: "home/Library/Application Support/Bitcoin/.cookie",
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

    expect(await getRpcConfigurationsFromDisk()).toEqual({
      serverUrl: "http://localhost:8332",
      username: "__cookie__",
      password: "1337",
      cookieFile: "home/.bitcoin/.cookie",
    });
  });

  [
    ["testnet", "testnet3", "1234", 18332],
    ["regtest", "regtest", "5678", 18443],
  ].forEach(([networkName, dirName, password, port]) => {
    test(`retrieving auth cookie for ${networkName} configurations`, async () => {
      vol.fromJSON({
        "home/.bitcoin/bitcoin.conf": `${networkName}=1`,
        [`home/.bitcoin/${dirName}/.cookie`]: `__cookie__:${password}`,
      });

      expect(await getRpcConfigurationsFromDisk()).toEqual({
        serverUrl: `http://localhost:${port}`,
        username: "__cookie__",
        password,
        cookieFile: `home/.bitcoin/${dirName}/.cookie`,
      });
    });
  });
});
