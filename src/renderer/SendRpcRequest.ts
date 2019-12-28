export const sendRpcRequest = data => {
  window.postMessage(data, "*");
};
