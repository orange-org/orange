import {
  calculateExplorerBlockListHeights,
  generateList,
} from "./calculateExplorerBlockListHeights";

describe("calculateExplorerBlockListHeights", () => {
  it("returns 20 elements only", () => {
    expect(calculateExplorerBlockListHeights(0, []).length).toBe(20);
  });

  it("works with an empty list", () => {
    let list = calculateExplorerBlockListHeights(100, []);
    expect(list).toEqual(generateList(100, 81));
    expect(list.length).toBe(20);

    list = calculateExplorerBlockListHeights(99, []);
    expect(list).toEqual(generateList(99, 80));
    expect(list.length).toBe(20);

    list = calculateExplorerBlockListHeights(0, []);
    expect(list).toEqual(generateList(19, 0));
    expect(list.length).toBe(20);

    list = calculateExplorerBlockListHeights(19, []);
    expect(list).toEqual(generateList(19, 0));
    expect(list.length).toBe(20);

    list = calculateExplorerBlockListHeights(19, []);
    expect(list).toEqual(generateList(19, 0));
    expect(list.length).toBe(20);

    list = calculateExplorerBlockListHeights(20, []);
    expect(list).toEqual(generateList(20, 1));
    expect(list.length).toBe(20);

    list = calculateExplorerBlockListHeights(5, []);
    expect(list).toEqual(generateList(19, 0));
    expect(list.length).toBe(20);
  });

  it("works for a currently displayed list", () => {
    const list = calculateExplorerBlockListHeights(79, generateList(99, 80));
    expect(list).toEqual(generateList(98, 79));
    expect(list.length).toBe(20);

    const list2 = calculateExplorerBlockListHeights(100, generateList(99, 80));
    expect(list2).toEqual(generateList(100, 81));
    expect(list2.length).toBe(20);

    const list3 = calculateExplorerBlockListHeights(0, generateList(20, 1));
    expect(list3).toEqual(generateList(19, 0));
    expect(list3.length).toBe(20);

    const list4 = calculateExplorerBlockListHeights(
      1665322,
      generateList(1665342, 1665323),
    );
    expect(list4).toEqual(generateList(1665341, 1665322));
    expect(list4.length).toBe(20);
  });
});
