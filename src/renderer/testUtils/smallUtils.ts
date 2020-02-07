import { prettyDOM } from "@testing-library/dom";

export const printElement = (element: Element | HTMLDocument) =>
  console.log(prettyDOM(element, 9999999999));
