import { resolve } from "path";

export function getAppRoot() {
  // Jump out of `main/` to be adjacent to `renderer/` where `package.json`
  // should be.
  return resolve(__dirname, "..");
}
