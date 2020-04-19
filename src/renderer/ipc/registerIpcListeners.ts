import { store } from "_r/redux/reducers/store";
import { Message, MtR } from "_t/IpcMessages";

const isMessageFromMain = (data: any): data is Message<MtR, string, any> => {
  return data && data.source === "@orange/main";
};

const windowMessageEventHandler = (event: MessageEvent) => {
  const { data } = event;

  if (isMessageFromMain(data)) {
    if (data.type === "set-data-in-redux-store") {
      store.dispatch(setMainProcessDataInReduxStore(data.message));
    }
  }
};
window.addEventListener("message", windowMessageEventHandler);
