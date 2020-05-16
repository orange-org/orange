import * as bip39 from "bip39";

export const getInvalidBip39Words = (
  tokenizedSeedPhrase: string[],
  validateLastWord: boolean,
) =>
  tokenizedSeedPhrase.reduce<Set<string>>((invalidBip39Words, word, index) => {
    const nextWord = tokenizedSeedPhrase[index + 1];

    const isLastWord = nextWord === "" || nextWord === undefined;

    if (!isLastWord || (isLastWord && validateLastWord)) {
      if (!bip39.wordlists.english.includes(word)) {
        invalidBip39Words.add(word);
      }
    }

    return invalidBip39Words;
  }, new Set());
