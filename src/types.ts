export type Action = {
  type: string;
  payload: any;
};

export type MainState = {
  systemPreferences: { [name: string]: string };
};

export type State = {
  main: MainState;
};
