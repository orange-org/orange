import { findByTestId } from "_tu/findByTestId";
import { initializeElectronCode } from "_tu/initializeElectronCode";
import { renderAppWithStore } from "_tu/renderAppWithStore";
import { startMockRpcServer } from "_tu/startMockRpcServer";

describe("RpcIssueDialog - missing `bitcoin.conf`", () => {
  beforeAll(async () => {
    startMockRpcServer();
    initializeElectronCode({ skipInitializingFilesystem: true }); // Don't add `bitcoin.conf` to the filesystem.
    await renderAppWithStore();
  });

  it("brings up the RPC issue dialog because there is no `bitcoin.conf`", async () => {
    expect(await findByTestId("rpcIssueDialog")).toBeInTheDocument();
  });
});
