import { fireEvent } from "@testing-library/react";
import { findByTestId } from "_tu/findByTestId";
import * as blockFixtures from "_tu/fixtures/blockFixtures";
import { initializeElectronCode } from "_tu/initializeElectronCode";
import { renderAppWithStore } from "_tu/renderAppWithStore";
import { waitWithTime } from "_tu/smallUtils";
import { startMockRpcServer } from "_tu/startMockRpcServer";
import { testIds } from "_tu/testIds";

describe("SearchBox", () => {
  describe("Search flow", () => {
    beforeAll(async () => {
      startMockRpcServer();
      initializeElectronCode();
      await renderAppWithStore();
    });

    test("app loads with the search box visible", async () => {
      /**
       * The app loads with the search box visible
       */
      expect(await findByTestId("searchInputField")).toBeVisible();
    });

    test("search for a block by height", async () => {
      /**
       * We will start by searching for a block by height
       */
      fireEvent.change(await findByTestId("searchInputField"), {
        target: { value: blockFixtures.blockFixture19.height },
      });

      fireEvent.keyUp(await findByTestId("searchInputField"), { keyCode: 13 });

      /**
       * `h1` is showing the block height of `blockFixture2` because we searched
       * for it
       */
      await waitWithTime(async () =>
        expect(await findByTestId(testIds.blockDetailsH1)).toHaveTextContent(
          `#${blockFixtures.blockFixture19.height.toLocaleString()}`,
        ),
      );
    });

    test("searching by hash", async () => {
      /**
       * We can now try searching for blockFixture3 by hash
       */
      fireEvent.change(await findByTestId("searchInputField"), {
        target: { value: blockFixtures.blockFixture18.hash },
      });

      fireEvent.keyUp(await findByTestId("searchInputField"), { keyCode: 13 });

      await waitWithTime(async () =>
        expect(await findByTestId(testIds.blockDetailsH1)).toHaveTextContent(
          `#${blockFixtures.blockFixture18.height.toLocaleString()}`,
        ),
      );
    });

    test("searching by transaction", async () => {
      fireEvent.change(await findByTestId("searchInputField"), {
        target: { value: blockFixtures.blockFixture18.tx[2] },
      });

      fireEvent.keyUp(await findByTestId("searchInputField"), { keyCode: 13 });

      expect(await findByTestId("transactionDetails")).toBeVisible();
    });

    test("it does not do anything if we modify the search field but try to submit with a key other than enter, like shift", async () => {
      fireEvent.change(await findByTestId("searchInputField"), {
        target: { value: blockFixtures.blockFixture19.hash },
      });

      fireEvent.keyUp(await findByTestId("searchInputField"), {
        keyCode: 16 /* shift */,
      });

      /**
       * Although we searched for blockFixture2, blockFixture3 from
       * the previous test is still showing. Pressing shift didn't
       * trigger the search.
       */
      await waitWithTime(async () =>
        expect(await findByTestId(testIds.blockDetailsH1)).toHaveTextContent(
          `#${blockFixtures.blockFixture18.height.toLocaleString()}`,
        ),
      );
    });

    test("it does not do anything when the search string does not return a block", async () => {
      fireEvent.change(await findByTestId("searchInputField"), {
        target: { value: "🕺" },
      });

      fireEvent.keyUp(await findByTestId("searchInputField"), { keyCode: 13 });

      /**
       * Same block is still displayed. Search didn't cause a change.
       */
      await waitWithTime(async () =>
        expect(await findByTestId(testIds.blockDetailsH1)).toHaveTextContent(
          `#${blockFixtures.blockFixture18.height.toLocaleString()}`,
        ),
      );
    });
  });
});
