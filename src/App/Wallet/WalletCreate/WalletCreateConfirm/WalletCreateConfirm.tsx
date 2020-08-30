import { useFormik } from "formik";
import React from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { FiChevronLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Icon } from "src/App/common/Icon";
import { Page } from "src/App/common/Page";
import { cn } from "src/cn";
import { wallet } from "src/data/WalletThunks";
import styles from "src/styles.css";
import { LinkButton } from "src/commonComponents/LinkButton/LinkButton";
import { Button } from "src/commonComponents/Button/Button";
import { BackButton } from "src/commonComponents/BackButton/BackButton";
import { Textarea } from "src/commonComponents/Textarea/Textarea";
import { useSetInitialMasterPublicKey } from "../../common/useSetInitialMasterPublicKey";

const useConfiguredFormik = (mnemonic: string) =>
  useFormik({
    validateOnMount: true,
    initialValues: {
      enteredMnemonic: "",
      iUnderstand: false,
    },
    validate: values => {
      const errors = {
        enteredMnemonic: "",
        iUnderstand: "",
      };

      if (values.enteredMnemonic.trim() !== mnemonic) {
        errors.enteredMnemonic =
          "The secret phrase you entered does not match the generated phrase";
      }

      if (values.iUnderstand !== true) {
        errors.iUnderstand = "error";
      }

      if (Object.values(errors).every(errorValue => errorValue.length === 0)) {
        return {};
      }

      return errors;
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

export const WalletCreateConfirm: React.FC<{ mnemonic: string }> = p => {
  const formik = useConfiguredFormik(p.mnemonic);
  const setInitialMasterPublicKey = useSetInitialMasterPublicKey();

  return (
    <Page title="Confirm Secret" leftLink={<BackButton />}>
      <Textarea
        placeholder="Enter your secret phrase here to confirm that you've wrote it down
      correctly"
        label="Secret phrase"
        id="mnemonicTextarea"
        {...formik.getFieldProps("enteredMnemonic")}
      />

      <p
        {...cn(
          styles.fontSize80Percent,
          styles.marginBottom1,
          styles.displayFlex,
          styles.alignItemsCenter,
          styles.colorRed,
          formik.touched.enteredMnemonic && formik.errors.enteredMnemonic
            ? styles.visibilityVisible
            : styles.visibilityHidden,
        )}
      >
        <Icon
          IconType={BsExclamationCircle}
          iconContextValue={{
            size: "1em",
            ...cn(styles.colorRed),
          }}
        />
        <span {...cn(styles.marginLeft2)}>{formik.errors.enteredMnemonic}</span>
      </p>

      <p>
        Orange will not store your secret but will ask you again for it before
        you can send money out.
      </p>

      <label
        htmlFor="orangeDoesNotStoreSecretPhrase"
        {...cn(styles.displayFlex)}
      >
        <span>
          <input
            {...cn(styles.transformScale1_5)}
            type="checkbox"
            id="orangeDoesNotStoreSecretPhrase"
            {...formik.getFieldProps("iUnderstand")}
          />
        </span>
        <span {...cn(styles.marginLeft3)}>
          I understand that Orange does not store this secret phrase but I will
          need it to send money out.
        </span>
      </label>

      <div {...cn(styles.marginTop10)} />

      <div {...cn(styles.displayFlex, styles.alignItemsCenter)}>
        <div {...cn(styles.flex1)} />

        <Button
          type="button"
          disabled={!formik.isValid}
          onClick={async () => {
            const masterPublicKey = await wallet.getMasterPublicKey(p.mnemonic);
            setInitialMasterPublicKey(masterPublicKey);
          }}
        >
          Open wallet
        </Button>
      </div>
    </Page>
  );
};
