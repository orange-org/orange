import { getInvalidBip39Words } from "./getInvalidBip39Words";

export const hasValidBip39Words = (
  seedPhrase: string,
  validateLastWord: boolean,
) => getInvalidBip39Words(seedPhrase, validateLastWord).length === 0;
