import http from "http";
import https from "https";

type RequestParams = {
  url: string;
  options: https.RequestOptions;
  body: any;
};

export const makeRpcRequest = (
  requestParams: RequestParams,
): Promise<http.IncomingMessage & { data: string }> => {
  const { url, options, body } = requestParams;

  return new Promise((resolve, reject) => {
    const nodeRequest = https.request(
      url,
      { ...options, rejectUnauthorized: false },
      response => {
        response.setEncoding("utf8");

        let data = "";

        response.on("data", dataChunk => {
          data += dataChunk;
        });

        response.on("end", () => {
          resolve(Object.assign(response, { data }));
        });
      },
    );

    nodeRequest.write(JSON.stringify(body));

    nodeRequest.on("error", reject);

    nodeRequest.end();
  });
};
