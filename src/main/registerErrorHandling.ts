import { UiHandledError } from "_c/UiHandledError";
import { showErrorDialog } from "./showErrorDialog";
import { callRenderer } from "./callRenderer";

const isOrangeError = (error: any): error is UiHandledError => {
  return error && "isOrangeError" in error;
};

export const registerErrorHandling = () => {
  const globalErrorHandler = (error: Error | {} | null | undefined) => {
    if (isOrangeError(error)) {
      callRenderer({
        nonce: error.nonce,
        type: "error",
        message: error.code,
      });
      return;
    }

    if (error) {
      showErrorDialog(error.toString());
    }
  };

  process.on("uncaughtException", globalErrorHandler);
  process.on("unhandledRejection", globalErrorHandler);
};
