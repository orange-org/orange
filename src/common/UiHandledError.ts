/* eslint-disable no-empty-function */

import { ErrorCode } from "./constants";

/* eslint-disable no-useless-constructor */
export class UiHandledError {
  public isUiHandledError = true;

  constructor(
    public nonce: NONCE,
    public code: ErrorCode,
    public message: string = "",
  ) {}
}
