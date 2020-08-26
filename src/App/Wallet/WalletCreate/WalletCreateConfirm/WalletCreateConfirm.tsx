import React, { useState } from "react";
import { Page } from "src/App/common/Page";
import styles from "src/styles.css";
import { cn } from "src/cn";
import { Link } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import { Icon } from "src/App/common/Icon";
import { useFormik } from "formik";

export const WalletCreateConfirm: React.FC<{ mnemonic: string }> = p => {
  const formik = useFormik({
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

      if (values.enteredMnemonic !== p.mnemonic) {
        errors.enteredMnemonic = "error";
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

  return (
    <Page title="Confirm Secret">
      <p>
        Enter your secret phrase below to confirm that you&apos;ve wrote it down
        correctly
      </p>

      <textarea
        id="mnemonicTextarea"
        rows={5}
        {...formik.getFieldProps("enteredMnemonic")}
      />

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
        <Link to="/wallet/create" {...cn(styles.flex1)}>
          <button
            {...cn(
              styles.borderNone,
              styles.displayFlex,
              styles.alignItemsCenter,
              styles.paddingLeft0,
            )}
            type="button"
          >
            <Icon IconType={FiChevronLeft} />
            Go back
          </button>
        </Link>

        <Link to="/wallet">
          <button type="button" disabled={!formik.isValid}>
            Open wallet
          </button>
        </Link>
      </div>
    </Page>
  );
};
