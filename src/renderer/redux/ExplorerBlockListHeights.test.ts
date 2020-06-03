import { range } from "lodash";
import { ExplorerBlockListHeights } from "./ExplorerBlockListHeights";

describe("ExplorerBlockListHeights", () => {
  it("returns 20 elements only", () => {
    expect(ExplorerBlockListHeights.calculate(0, []).length).toBe(20);
  });

  it("works with an empty list", () => {
    let list = ExplorerBlockListHeights.calculate(100, []);
    expect(list).toEqual(range(100, 80));
    expect(list.length).toBe(20);

    list = ExplorerBlockListHeights.calculate(99, []);
    expect(list).toEqual(range(99, 79));
    expect(list.length).toBe(20);

    list = ExplorerBlockListHeights.calculate(0, []);
    expect(list).toEqual(range(19, -1));
    expect(list.length).toBe(20);

    list = ExplorerBlockListHeights.calculate(19, []);
    expect(list).toEqual(range(19, -1));
    expect(list.length).toBe(20);

    list = ExplorerBlockListHeights.calculate(19, []);
    expect(list).toEqual(range(19, -1));
    expect(list.length).toBe(20);

    list = ExplorerBlockListHeights.calculate(20, []);
    expect(list).toEqual(range(20, 0));
    expect(list.length).toBe(20);

    list = ExplorerBlockListHeights.calculate(5, []);
    expect(list).toEqual(range(19, -1));
    expect(list.length).toBe(20);
  });

  it("works for a currently displayed list", () => {
    const list = ExplorerBlockListHeights.calculate(79, range(99, 79));
    expect(list).toEqual(range(98, 78));
    expect(list.length).toBe(20);

    const list2 = ExplorerBlockListHeights.calculate(100, range(99, 79));
    expect(list2).toEqual(range(100, 80));
    expect(list2.length).toBe(20);

    const list3 = ExplorerBlockListHeights.calculate(0, range(20, 0));
    expect(list3).toEqual(range(19, -1));
    expect(list3.length).toBe(20);

    const list4 = ExplorerBlockListHeights.calculate(
      1665322,
      range(1665342, 1665322),
    );
    expect(list4).toEqual(range(1665341, 1665321));
    expect(list4.length).toBe(20);
  });
});
