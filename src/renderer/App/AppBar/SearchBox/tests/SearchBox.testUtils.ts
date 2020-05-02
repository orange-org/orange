import { screen } from "@testing-library/dom";

export const pageElements = {
  search: () => screen.findByLabelText("search"),
};
