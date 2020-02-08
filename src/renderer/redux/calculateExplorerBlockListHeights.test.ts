import {
  calculateExplorerBlockListHeights,
  generateList,
} from "./calculateExplorerBlockListHeights";

describe("calculateBlockList", () => {
  describe("empty currently displayed list", () => {
    it("works for beginning of the list", () => {
      expect(calculateExplorerBlockListHeights(100, [])).toEqual(
        generateList(100, 80),
      );

      expect(calculateExplorerBlockListHeights(99, [])).toEqual(
        generateList(99, 79),
      );
    });

    it("works for end of the list", () => {
      expect(calculateExplorerBlockListHeights(0, [])).toEqual(
        generateList(20, 0),
      );
      expect(calculateExplorerBlockListHeights(20, [])).toEqual(
        generateList(20, 0),
      );
      expect(calculateExplorerBlockListHeights(5, [])).toEqual(
        generateList(20, 0),
      );
    });
  });

  describe("with currently displayed list", () => {
    it("works for the beginning of the list", () => {
      expect(
        calculateExplorerBlockListHeights(78, generateList(99, 79)),
      ).toEqual(generateList(98, 78));

      expect(
        calculateExplorerBlockListHeights(100, generateList(99, 79)),
      ).toEqual(generateList(100, 80));

      expect(calculateExplorerBlockListHeights(0, generateList(21, 1))).toEqual(
        generateList(20, 0),
      );
    });
  });
});
