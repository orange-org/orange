import { randomBytes } from "crypto";
import { username, password } from "main/bitcoindCredentials";
import { RpcRequest } from "typings/types";
import http from "http";

export const sendRpcRequestToBitcoind = (rpcRequest: RpcRequest) => {
  const { method, params } = rpcRequest;
  const url = "http://localhost:18332/";

  const request = http.request(
    url,
    {
      method: "POST",
      auth: `${username}:${password}`,
      headers: {
        "content-type": "text/plain",
      },
    },
    response => {
      response.setEncoding("utf8");

      response.on("data", data => {
        console.log("data", data);
      });
      response.on("end", (data: any) => {
        console.log("end", data);
      });
      response.on("error", data => {
        console.log("error", data);
      });
    },
  );

  request.on("error", error => {
    console.error(`problem with request: ${error.message}`);
  });

  request.write(
    JSON.stringify({
      jsonrpc: "1.0",
      id: randomBytes(8).toString("base64"),
      method,
      params,
    }),
  );

  request.end();

  // fetch(, {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString(
  //       "base64",
  //     )}`,
  //     "content-type": "text/plain",
  //   },
  //   body: JSON.stringify({
  //     jsonrpc: "1.0",
  //     id: randomBytes(8).toString("base64"),
  //     method,
  //     params,
  //   }),
  // })
  //   .then(response => response.json())
  //   .then(data => console.log(data));
};
