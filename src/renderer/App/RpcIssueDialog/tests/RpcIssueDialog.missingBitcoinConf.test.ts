import { TestElement } from "_tu/TestElement";
import { MockElectron } from "_tu/MockElectron";
import { appWithStore } from "_tu/AppWithStore";
import { MockRpcServer } from "_tu/MockRpcServer";

jest.mock("_f/FeatureFlags", () => ({
  __esModule: true,
  FeatureFlags: {
    useBcore: true,
  },
}));

describe("RpcIssueDialog - missing `bitcoin.conf`", () => {
  beforeAll(async () => {
    MockRpcServer.start();
    MockElectron.start({ skipInitializingFilesystem: true }); // Don't add `bitcoin.conf` to the filesystem.
    await appWithStore.render();
  });

  it("brings up the RPC issue dialog because there is no `bitcoin.conf`", async () => {
    expect(
      await TestElement.findByTestId("fixBcoreConnectionDialog"),
    ).toBeInTheDocument();
  });
});
