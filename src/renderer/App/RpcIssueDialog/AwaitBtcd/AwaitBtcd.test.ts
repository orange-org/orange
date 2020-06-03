import { wait, act } from "@testing-library/react";
import { TestElement } from "_tu/TestElement";
import { MockElectron } from "_tu/MockElectron";
import { appWithStore } from "_tu/AppWithStore";
import { MockRpcServer } from "_tu/MockRpcServer";

jest.mock("_f/FeatureFlags", () => ({
  __esModule: true,
  FeatureFlags: {
    useBcore: false,
  },
}));

describe("AwaitBtcd", () => {
  beforeAll(async () => {
    MockRpcServer.startErroring();
    MockElectron.start();
    await appWithStore.render();
  });

  it("shows the start up dialog when btcd is not ready", async () => {
    expect(
      await TestElement.findByTestId("awaitBtcdDialog"),
    ).toBeInTheDocument();
  });

  it("hides the start up dialog when btcd is eventually ready", async () => {
    MockRpcServer.start();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await wait(async () =>
      expect(
        await TestElement.queryByTestId("awaitBtcdDialog-closed" as any),
      ).toBeInTheDocument(),
    );
  });
});
