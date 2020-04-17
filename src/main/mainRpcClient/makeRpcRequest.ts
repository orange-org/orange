import http from "http";

type RequestParams = {
  url: string;
  options: http.RequestOptions;
  body?: any;
};

export const makeRpcRequest = (
  requestParams: RequestParams,
): Promise<http.IncomingMessage & { data: string }> => {
  const { url, options, body } = requestParams;

  return new Promise((resolve, reject) => {
    const nodeRequest = http.request(url, options, response => {
      response.setEncoding("utf8");

      let data = "";

      response.on("data", dataChunk => {
        data += dataChunk;
      });

      response.on("end", () => {
        resolve(Object.assign(response, { data }));
      });
    });

    if (body) {
      nodeRequest.write(JSON.stringify(body));
    }

    nodeRequest.on("error", reject);

    nodeRequest.end();
  });
};
