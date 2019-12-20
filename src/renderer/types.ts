export type Action = {
  type: string;
  payload: any;
};

export type BitcoindOutput = { initMessage: string };

export type MainState = {
  systemPreferences: { [name: string]: string };
  bitcoindOutput: BitcoindOutput;
};

export type State = {
  main: MainState;
};
