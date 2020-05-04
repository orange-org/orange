import { defaults, matches } from "lodash";
import nock from "nock";
import { PASSWORD, SERVER_URL, USERNAME } from "_tu/initializeElectronCode";
import { RpcRequest } from "_t/RpcRequests";
import { RpcResponse } from "_t/RpcResponses";

type RpcResponseResult =
  | RpcResponse["result"]
  | { error: { code: number; message: string } };

export const getDefaultNockOptions = (
  username = USERNAME,
  password = PASSWORD,
) => ({
  reqheaders: {
    authorization: `Basic ${btoa(`${username}:${password}`)}`,
  },
});

export const createNockRequestResponse = <
  T extends {
    username?: string;
    password?: string;
    response?: any;
    scope?: nock.Scope;
    statusCode?: number;
    persist?: boolean;
  }
>(
  body: RpcRequest,
  result: RpcResponseResult,
  options_?: T,
) => {
  const options = defaults({}, options_, {
    username: USERNAME,
    password: PASSWORD,
    response: {},
    statusCode: 200,
  });

  const scope =
    options.scope ||
    nock(SERVER_URL, getDefaultNockOptions(options.username, options.password));

  const response = { ...options.response, result };

  if (options.persist) {
    scope.persist();
  }

  return scope.post("/", matches(body)).reply(options.statusCode, response);
};
