import { wait, act } from "@testing-library/react";
import { findByTestId, queryByTestId } from "_tu/findByTestId";
import { initializeElectronCode } from "_tu/initializeElectronCode";
import { renderAppWithStore } from "_tu/renderAppWithStore";
import {
  startMockErroringRpcServer,
  startMockRpcServer,
} from "_tu/startMockRpcServer";

jest.mock("_f/featureFlags", () => ({
  __esModule: true,
  featureFlags: {
    useBcore: false,
  },
}));

describe("AwaitBtcd", () => {
  beforeAll(async () => {
    startMockErroringRpcServer();
    initializeElectronCode();
    await renderAppWithStore();
  });

  it("shows the start up dialog when btcd is not ready", async () => {
    expect(await findByTestId("awaitBtcdDialog")).toBeInTheDocument();
  });

  it("hides the start up dialog when btcd is eventually ready", async () => {
    startMockRpcServer();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await wait(async () =>
      expect(
        await queryByTestId("awaitBtcdDialog-closed" as any),
      ).toBeInTheDocument(),
    );
  });
});
