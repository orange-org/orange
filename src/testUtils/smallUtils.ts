/* eslint-disable no-console */
import { prettyDOM } from "@testing-library/dom";
import waitForExpect from "wait-for-expect";
import nock from "nock";
import { act } from "@testing-library/react";
import userEvent_ from "@testing-library/user-event";

export const printElement = (element: Element | HTMLDocument) =>
  console.log(prettyDOM(element, 9999999999));

export const expectNoPendingHttpRequests = () =>
  waitForExpect(() => expect(nock.isDone()).toBe(true));

export const userEvent = {
  type: (...args: Parameters<typeof userEvent_.type>) =>
    act(() => userEvent_.type(...args)),

  click: (...args: Parameters<typeof userEvent_.click>) =>
    act(() => userEvent_.click(...args)),

  clear: (element: Element | Window) =>
    act(() => (userEvent_ as any).clear(element)),
};
