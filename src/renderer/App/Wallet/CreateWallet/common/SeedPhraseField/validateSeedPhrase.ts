import * as bip39 from "bip39";
import { getInvalidBip39Words } from "./getInvalidBip39Words";
import { tokenizeSeedPhrase } from "./tokenizeSeedPhrase";

export enum SeedPhraseErrors {
  missing,
  invalidWords,
  tooShort,
  tooLong,
  invalidChecksum,
  comparisonMismatch,
}

export const validateSeedPhrase = (
  seedPhrase: string,
  validateLastWord: boolean,
  compareWith?: string,
) => {
  if (!seedPhrase) {
    return { error: SeedPhraseErrors.missing };
  }

  const tokenized = tokenizeSeedPhrase(seedPhrase.trim());
  const invalidBip39Words = getInvalidBip39Words(tokenized, validateLastWord);

  if (invalidBip39Words.size > 0) {
    return {
      error: SeedPhraseErrors.invalidWords,
      invalidBip39Words,
    };
  }

  if (tokenized.length > 24) {
    return { error: SeedPhraseErrors.tooLong };
  }

  if (tokenized.length < 12) {
    return { error: SeedPhraseErrors.tooShort };
  }

  if (!bip39.validateMnemonic(seedPhrase)) {
    return { error: SeedPhraseErrors.invalidChecksum };
  }

  if (seedPhrase !== compareWith) {
    return { error: SeedPhraseErrors.comparisonMismatch };
  }

  return null;
};
