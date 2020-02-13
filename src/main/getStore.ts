const store: Partial<{
  username: string;
  password: string;
}> = {};

/**
 * With Redux, we put all states in one object. This makes state management
 * easier. It also allows us to reset the state between tests.
 *
 * In the `main` process we don't have Redux but we still have the same needs
 * that Redux addresses. Instead of trying to rebuild Redux, we built this
 * simple alternative which should serve our immediate need.
 *
 * `store` is an object that the rest of the codebase can mutate at will. And
 * they will save their values here instead of to the local class state.
 *
 * Consolidating our state here will allow us to reset it between tests.
 *
 * `getStore` function gives us a chance to mock `store` for tests.
 */
export const getStore = () => store;
