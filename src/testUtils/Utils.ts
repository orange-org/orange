/* eslint-disable no-console */
import { prettyDOM } from "@testing-library/dom";
import { act, wait } from "@testing-library/react";
import userEvent_ from "@testing-library/user-event";

export class Utils {
  static printElement = (element: Element | HTMLDocument) =>
    console.log(prettyDOM(element, 9999999999));

  static userEvent = {
    type: (...args: Parameters<typeof userEvent_.type>) =>
      act(() => userEvent_.type(...args)),

    click: (...args: Parameters<typeof userEvent_.click>) =>
      act(() => userEvent_.click(...args)),

    clear: (element: Element | Window) =>
      act(() => (userEvent_ as any).clear(element)),
  };

  static waitWithTime = async (...args: Parameters<typeof wait>) => {
    const [callback, ...rest] = args;

    if (!callback) {
      throw TypeError("callback has to be a function");
    }

    return wait(async () => {
      jest.advanceTimersByTime(1000);
      return callback();
    }, ...rest);
  };
}
