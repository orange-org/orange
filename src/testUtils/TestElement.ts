import { screen } from "@testing-library/dom";
import { testIds } from "../testIds";

type TestId = keyof typeof testIds;

export class TestElement {
  static findByTestId = (testId: TestId) => screen.findByTestId(testId);

  static queryByTestId = (testId: TestId) => screen.queryByTestId(testId);

  static findAllByTestId = (testId: TestId) => screen.findAllByTestId(testId);
}
