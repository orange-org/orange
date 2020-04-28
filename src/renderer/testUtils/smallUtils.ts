/* eslint-disable no-console */
import { prettyDOM } from "@testing-library/dom";
import waitForExpect from "wait-for-expect";
import nock from "nock";

export const printElement = (element: Element | HTMLDocument) =>
  console.log(prettyDOM(element, 9999999999));

export const expectNoPendingHttpRequests = () =>
  waitForExpect(() => expect(nock.isDone()).toBe(true));
