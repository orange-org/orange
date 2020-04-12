/* istanbul ignore file: `startMainProcess` is tested */
import { startMainProcess } from "./startMainProcess";
import { showErrorDialog } from "./showErrorDialog";

const globalErrorHandler = (error: Error | {} | null | undefined) =>
  error ? showErrorDialog(error.toString()) : null;

process.on("uncaughtException", globalErrorHandler);
process.on("unhandledRejection", globalErrorHandler);

startMainProcess();
