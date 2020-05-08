import { delay } from "bluebird";
/**
 * Since Orange works with a local back-end (bitcoind), data fetches are
 * responded to instantaneously. While this seems great at first, actually
 * the user experience can be improved by adding a tiny delay to data fetching.
 *
 * For example: the delay allows us to show a layout skeleton, which indicates
 * to the user that new information is being shown. Or that there's a transition.
 * It also allows the page to render with a skeleton before displaying the
 * actual data, which improves performance. The delay is intended to be less
 * than a second.
 */
export const withDelay = async <T>(val: T, ms: number = 500) => {
  const values = await Promise.all([val, delay(ms)]);

  return values[0];
};
