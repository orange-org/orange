import { fireEvent } from "@testing-library/react";
import { TestElement } from "_tu/TestElement";
import * as blockFixtures from "_tu/fixtures/blockFixtures";
import { MockElectron } from "_tu/MockElectron";
import { appWithStore } from "_tu/AppWithStore";
import { Utils } from "_tu/Utils";
import { MockRpcServer } from "_tu/MockRpcServer";
import { testIds } from "_r/testIds";

jest.mock("_f/featureFlags", () => ({
  __esModule: true,
  featureFlags: {
    useBcore: true,
  },
}));

describe("SearchBox", () => {
  describe("Search flow", () => {
    beforeAll(async () => {
      MockRpcServer.start();
      MockElectron.start();
      await appWithStore.render();
    });

    test("app loads with the search box visible", async () => {
      /**
       * The app loads with the search box visible
       */
      expect(await TestElement.findByTestId("searchInputField")).toBeVisible();
    });

    test("search for a block by height", async () => {
      /**
       * We will start by searching for a block by height
       */
      fireEvent.change(await TestElement.findByTestId("searchInputField"), {
        target: { value: blockFixtures.blockFixture19.height },
      });

      fireEvent.keyUp(await TestElement.findByTestId("searchInputField"), {
        keyCode: 13,
      });

      /**
       * `h1` is showing the block height of `blockFixture2` because we searched
       * for it
       */
      await Utils.waitWithTime(async () =>
        expect(
          await TestElement.findByTestId(testIds.blockDetailsH1),
        ).toHaveTextContent(
          `#${blockFixtures.blockFixture19.height.toLocaleString()}`,
        ),
      );
    });

    test("searching by hash", async () => {
      /**
       * We can now try searching for blockFixture3 by hash
       */
      fireEvent.change(await TestElement.findByTestId("searchInputField"), {
        target: { value: blockFixtures.blockFixture18.hash },
      });

      fireEvent.keyUp(await TestElement.findByTestId("searchInputField"), {
        keyCode: 13,
      });

      await Utils.waitWithTime(async () =>
        expect(
          await TestElement.findByTestId(testIds.blockDetailsH1),
        ).toHaveTextContent(
          `#${blockFixtures.blockFixture18.height.toLocaleString()}`,
        ),
      );
    });

    test("searching by transaction", async () => {
      fireEvent.change(await TestElement.findByTestId("searchInputField"), {
        target: { value: blockFixtures.blockFixture18.tx[2] },
      });

      fireEvent.keyUp(await TestElement.findByTestId("searchInputField"), {
        keyCode: 13,
      });

      expect(
        await TestElement.findByTestId("transactionDetails"),
      ).toBeVisible();
    });

    test("it does not do anything if we modify the search field but try to submit with a key other than enter, like shift", async () => {
      fireEvent.change(await TestElement.findByTestId("searchInputField"), {
        target: { value: blockFixtures.blockFixture19.hash },
      });

      fireEvent.keyUp(await TestElement.findByTestId("searchInputField"), {
        keyCode: 16 /* shift */,
      });

      /**
       * Although we searched for blockFixture2, blockFixture3 from
       * the previous test is still showing. Pressing shift didn't
       * trigger the search.
       */
      await Utils.waitWithTime(async () =>
        expect(
          await TestElement.findByTestId(testIds.blockDetailsH1),
        ).toHaveTextContent(
          `#${blockFixtures.blockFixture18.height.toLocaleString()}`,
        ),
      );
    });

    test("it does not do anything when the search string does not return a block", async () => {
      fireEvent.change(await TestElement.findByTestId("searchInputField"), {
        target: { value: "🕺" },
      });

      fireEvent.keyUp(await TestElement.findByTestId("searchInputField"), {
        keyCode: 13,
      });

      /**
       * Same block is still displayed. Search didn't cause a change.
       */
      await Utils.waitWithTime(async () =>
        expect(
          await TestElement.findByTestId(testIds.blockDetailsH1),
        ).toHaveTextContent(
          `#${blockFixtures.blockFixture18.height.toLocaleString()}`,
        ),
      );
    });
  });
});
