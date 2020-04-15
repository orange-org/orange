// import { ErrorMtR } from "_t/IpcMessages";
// import { ERROR_CODES } from "_c/constants";
// import { store } from "_r/redux/reducers/store";

// const isErrorMessage = (data: any): data is ErrorMtR => {
//   return data && data.source === "@orange/main" && data.type === "error";
// };

// const windowMessageEventHandler = (event: MessageEvent) => {
//   // const { data } = event;

//   // if (isErrorMessage(data)) {
//   //   if (
//   //     ERROR_CODES.couldNotFindBitcoinConf === data.message ||
//   //     ERROR_CODES.couldNotFindCookieFile === data.message
//   //   ) {
//   //     store.dispatch(askUserToFixConnectionError(data.message));
//   //   }
//   // }
// };
// window.addEventListener("message", windowMessageEventHandler);
