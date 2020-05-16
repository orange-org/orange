import * as bip39 from "bip39";
import { getInvalidBip39Words } from "./getInvalidBip39Words";
import { tokenizeSeedPhrase } from "./tokenizeSeedPhrase";

export enum SeedPhraseErrors {
  MISSING,
  INVALID_WORDS,
  TOO_SHORT,
  TOO_LONG,
  INVALID_CHECKSUM,
}

export const validateSeedPhrase = (
  seedPhrase: string,
  validateLastWord: boolean,
) => {
  if (!seedPhrase) {
    return { error: SeedPhraseErrors.MISSING };
  }

  const tokenized = tokenizeSeedPhrase(seedPhrase.trim());
  const invalidBip39Words = getInvalidBip39Words(tokenized, validateLastWord);

  if (invalidBip39Words.size > 0) {
    return {
      error: SeedPhraseErrors.INVALID_WORDS,
      invalidBip39Words,
    };
  }

  if (tokenized.length > 24) {
    return { error: SeedPhraseErrors.TOO_LONG };
  }

  if (tokenized.length < 12) {
    return { error: SeedPhraseErrors.TOO_SHORT };
  }

  if (!bip39.validateMnemonic(seedPhrase)) {
    return { error: SeedPhraseErrors.INVALID_CHECKSUM };
  }

  return null;
};
