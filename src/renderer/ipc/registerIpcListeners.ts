import { setMainProcessDataInReduxStore } from "_r/redux/actions";
import { store } from "_r/redux/reducers/store";
import { MessageToRenderer } from "_t/IpcMessages";

const isOfType = <T extends MessageToRenderer["type"]>(
  data: any,
  type: T,
): data is Extract<MessageToRenderer, { type: T }> =>
  data && data.source === "@orange/main" && data.type === type;

const windowMessageEventHandler = (event: MessageEvent) => {
  const { data } = event;

  if (isOfType(data, "set-data-in-redux-store")) {
    store.dispatch(setMainProcessDataInReduxStore(data.message));
  }
};
window.addEventListener("message", windowMessageEventHandler);
