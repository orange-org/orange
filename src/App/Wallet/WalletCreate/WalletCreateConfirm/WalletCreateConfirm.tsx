import React, { useState } from "react";
import { Page } from "src/App/common/Page";
import styles from "src/styles.css";
import { cn } from "src/cn";
import { Link } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import { Icon } from "src/App/common/Icon";
import { useFormik } from "formik";
import { LinkButton } from "src/App/common/LinkButton";
import { BsExclamationCircle } from "react-icons/bs";

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

  return (
    <Page title="Confirm Secret">
      <p>
        Enter your secret phrase below to confirm that you&apos;ve wrote it down
        correctly
      </p>

      <textarea
        {...cn(styles.marginBottom0)}
        id="mnemonicTextarea"
        rows={5}
        {...formik.getFieldProps("enteredMnemonic")}
        onChange={e =>
          formik.setFieldValue("enteredMnemonic", e.target.value.trim())
        }
      />

      <p
        {...cn(
          styles.fontSize80Percent,
          styles.marginBottom1,
          styles.colorRed900,
          styles.displayFlex,
          styles.alignItemsCenter,
          formik.touched.enteredMnemonic && formik.errors.enteredMnemonic
            ? styles.visibilityVisible
            : styles.visibilityHidden,
        )}
      >
        <Icon
          IconType={BsExclamationCircle}
          iconContextValue={{ color: "#b71c1c", size: "1em" }}
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
        <Link
          to="/wallet/create"
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
        </Link>

        <div {...cn(styles.flex1)} />

        <LinkButton disabled={!formik.isValid} to="/wallet">
          Open wallet
        </LinkButton>
      </div>
    </Page>
  );
};
