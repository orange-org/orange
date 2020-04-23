import { showErrorDialog } from "./showErrorDialog";

export const registerErrorHandling = () => {
  const globalErrorHandler = (error: Error | {} | null | undefined) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      showErrorDialog(
        error instanceof Error
          ? error.toString()
          : JSON.stringify(error, null, 2),
      );
    }
  };

  process.on("uncaughtException", globalErrorHandler);
  process.on("unhandledRejection", globalErrorHandler);
};
