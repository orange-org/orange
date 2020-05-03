import { screen } from "@testing-library/dom";
import { testIds } from "./testIds";

type TestId = keyof typeof testIds;

export const findByTestId = (testId: TestId) => screen.findByTestId(testId);

export const queryByTestId = (testId: TestId) => screen.queryByTestId(testId);

export const findAllByTestId = (testId: TestId) =>
  screen.findAllByTestId(testId);
