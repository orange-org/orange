import { rangeRight, range, last } from "lodash";

/**
 * The problem we are trying to solve here is the following:
 *
 * When the user requests a block height, we are trying to display a list of
 * blocks that includes the block height requested by the user. For example,
 * let's say the user requests block 100. If we want to display block 100 at the
 * top then the list would be 100, 99, 98, 97, 96, etc. But what if the user
 * requests block 0. Then we can't count down. We'll have to count up. Or what
 * if the user gives us block 5? Then we have to count both up and down.
 *
 * That's not all. The problem is more complicated. We also want to be able to
 * reconcile two lists. For example, the user might be already looking at list
 * [100..120]. Now the user requests block 121 in that case we want to preserve
 * the existing list as much as possible, so we would want to display
 * [101..121]. This is a different behavior than if the user was not looking at
 * anything or if the user requested a height that's too far from the list he
 * currently has.
 *
 * So...
 *
 * * let HEIGHTS be the list [0..n] where n is any positive number
 * * let SELECTED_HEIGHT be any number from HEIGHTS
 * * let CURRENTLY_DISPLAYED_BLOCKS be a subset of HEIGHTS such as [i..i + 20] where i >= 0
 *
 * Given the above three values, compute DISPLAYED_BLOCKS according to the requirements
 * described earlier.
 */
export const generateList = (start: number, end: number) => {
  return range(start, end - 1);
};

const WINDOW_SIZE = 20;
export const calculateExplorerBlockListHeights = (
  selectedHeight: number,
  currentlyDisplayedList: number[],
) => {
  if (currentlyDisplayedList.length > 0) {
    if (currentlyDisplayedList.includes(selectedHeight)) {
      return currentlyDisplayedList;
    }

    const lowestCurrentlyDisplayedHeight = last(currentlyDisplayedList)!;
    const isLower = selectedHeight < lowestCurrentlyDisplayedHeight;

    if (isLower) {
      const distanceFromBottom =
        lowestCurrentlyDisplayedHeight - selectedHeight;

      if (distanceFromBottom < WINDOW_SIZE) {
        return generateList(selectedHeight + WINDOW_SIZE, selectedHeight);
      }
    }
  }

  const beginningOfRange =
    selectedHeight < WINDOW_SIZE ? WINDOW_SIZE : selectedHeight;

  return generateList(beginningOfRange, beginningOfRange - WINDOW_SIZE);
};
