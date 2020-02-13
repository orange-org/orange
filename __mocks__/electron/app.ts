import { EventEmitter } from "events";

class App extends EventEmitter {
  getAppPath = () => "";

  enableSandbox = () => null;
}

export const app = new App();

export const resetApp = () => {
  app.removeAllListeners();
};
