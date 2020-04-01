import { resolve } from "path";

export function getAppRoot() {
  // Jump out of `main/` to be in `dist/`
  return resolve(__dirname, "..");
}
