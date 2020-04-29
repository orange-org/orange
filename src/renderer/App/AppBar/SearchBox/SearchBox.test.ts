import { screen } from "@testing-library/dom";
import { cleanup, fireEvent } from "@testing-library/react";
import { initializeElectronCode } from "_m/startMainProcess.testHelpers";
import * as blockFixtures from "_tu/fixtures/blockFixtures";
import { renderAppWithStore } from "_tu/renderAppWithStore";
import { startRpcMockServer } from "_tu/startRpcMockServer";

describe("SearchBox", () => {
  /**
   * WARNING: the test cases in this block depend on each other and must
   * run sequentially
   */
  describe("Search flow", () => {
    beforeAll(async () => {
      startRpcMockServer();
      initializeElectronCode(false);
      await renderAppWithStore();
    });

    afterAll(() => {
      cleanup();
    });

    test("app loads with the search box visible", async () => {
      /**
       * The app loads with the search box visible
       */
      const searchBox = await screen.findByLabelText("search");
      expect(searchBox).toBeVisible();
    });

    test("search for a block by height", async () => {
      const searchBox = await screen.findByLabelText("search");

      /**
       * We will start by searching for a block by height
       */
      fireEvent.change(searchBox, {
        target: { value: blockFixtures.blockFixture2.height },
      });

      fireEvent.keyUp(searchBox, { keyCode: 13 });

      /**
       * `h1` is showing the block height of `blockFixture2` because we searched
       * for it
       */
      expect(
        await screen.findByText(
          `#${blockFixtures.blockFixture2.height.toLocaleString()}`,
          { selector: "h1" },
        ),
      ).toBeVisible();
    });

    test("searching by hash", async () => {
      const searchBox = await screen.findByLabelText("search");

      /**
       * We can now try searching for blockFixture3 by hash
       */
      fireEvent.change(searchBox, {
        target: { value: blockFixtures.blockFixture3.hash },
      });

      fireEvent.keyUp(searchBox, { keyCode: 13 });

      expect(
        await screen.findByText(
          `#${blockFixtures.blockFixture3.height.toLocaleString()}`,
          { selector: "h1" },
        ),
      ).toBeVisible();
    });

    test("searching by transaction", async () => {
      const searchBox = await screen.findByLabelText("search");

      fireEvent.change(searchBox, {
        target: { value: blockFixtures.blockFixture3.tx[2] },
      });

      fireEvent.keyUp(searchBox, { keyCode: 13 });

      expect(
        await screen.findByText("Transaction", { selector: "h2" }),
      ).toBeVisible();

      expect(
        await screen.findByText(blockFixtures.blockFixture3.tx[2], {
          selector: "p",
        }),
      ).toBeVisible();
    });

    test("it does not do anything if we modify the search field but try to submit with a key other than enter, like shift", async () => {
      const searchBox = await screen.findByLabelText("search");

      fireEvent.change(searchBox, {
        target: { value: blockFixtures.blockFixture2.hash },
      });

      fireEvent.keyUp(searchBox, { keyCode: 16 /* shift */ });

      /**
       * Although we searched for blockFixture2, blockFixture3 from
       * the previous test is still showing. Pressing shift didn't
       * trigger the search.
       */
      expect(
        await screen.findByText(
          `#${blockFixtures.blockFixture3.height.toLocaleString()}`,
          { selector: "h1" },
        ),
      ).toBeVisible();
    });

    test("it does not do anything when the search string does not return a block", async () => {
      const searchBox = await screen.findByLabelText("search");

      fireEvent.change(searchBox, {
        target: { value: "🕺" },
      });

      fireEvent.keyUp(searchBox, { keyCode: 13 });

      /**
       * Same block is still displayed. Search didn't cause a change.
       */
      expect(
        await screen.findByText(
          `#${blockFixtures.blockFixture3.height.toLocaleString()}`,
          { selector: "h1" },
        ),
      ).toBeVisible();
    });
  });
});
