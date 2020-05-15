import { pluralize } from "_r/utils/smallUtils";
import { SeedPhraseErrors, validateSeedPhrase } from "./validateSeedPhrase";

export const getErrorInfo = (
  errors: ReturnType<typeof validateSeedPhrase>,
  isSeedPhraseFieldTouched: boolean,
) => {
  let showError = false;
  let invalidWords: Set<string>;
  let helperText: string = "";

  if (errors !== null) {
    if (errors.error === SeedPhraseErrors.INVALID_WORDS) {
      showError = true;
      invalidWords = errors.invalidBip39Words!;

      const { size } = invalidWords;

      helperText = `${Array.from(invalidWords).join(", ")} ${pluralize(
        size,
        "is not a standard Bitcoin seed word",
        "are not standard Bitcoin seed words",
      )}`;
    } else if (isSeedPhraseFieldTouched) {
      showError = true;

      if (errors.error === SeedPhraseErrors.INVALID_CHECKSUM) {
        helperText = "The seed words don't add up (invalid checksum)";
      } else if (errors.error === SeedPhraseErrors.MISSING) {
        helperText = "Required";
      } else if (errors.error === SeedPhraseErrors.TOO_LONG) {
        helperText = "A seed phrase should not be longer than 24 words";
      } else if (errors.error === SeedPhraseErrors.TOO_SHORT) {
        helperText = "A seed phrase should not be shorter than 12 words";
      }
    }
  }

  return { showError, helperText };
};
