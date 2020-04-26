import { EventEmitter } from "events";

class App extends EventEmitter {
  getAppPath = () => "";

  enableSandbox = () => null;

  getPath = () => "/platform-specific/app-path";
}

export const app = new App();

export const resetApp = () => {
  app.removeAllListeners();
};
