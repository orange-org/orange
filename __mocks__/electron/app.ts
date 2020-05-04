import { EventEmitter } from "events";

class App extends EventEmitter {
  getAppPath = () => "";

  enableSandbox = jest.fn();

  getPath = () => "/platform-specific/app-path";
}

export const app = new App();
