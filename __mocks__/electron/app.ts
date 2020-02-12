/* eslint-disable import/no-mutable-exports */
import { EventEmitter } from "events";

class App extends EventEmitter {
  getAppPath = () => "";
  enableSandbox = () => null;
}

let app = new App();

export const resetApp = () => {
  app = new App();
};

export { app };
