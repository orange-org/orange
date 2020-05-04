export class ErrorWithCode extends Error {
  constructor(public message: string, public code: number | string) {
    super(message);
    this.code = code;
  }
}
