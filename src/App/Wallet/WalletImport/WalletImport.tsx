import { useFormik } from "formik";
import React from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { Icon } from "src/App/common/Icon";
import { Page } from "src/App/common/Page";
import { cn } from "src/cn";
import { BackButton } from "src/commonComponents/BackButton/BackButton";
import { Button } from "src/commonComponents/Button/Button";
import { Textarea } from "src/commonComponents/Textarea/Textarea";
import { Wallet } from "src/data/Wallet";
import styles from "src/styles.css";
import { useSetInitialMasterPublicKey } from "../common/useSetInitialMasterPublicKey";

const useConfiguredFormik = () =>
  useFormik({
    validateOnMount: true,
    initialValues: {
      masterPublicKey: "",
    },
    validate: values => {
      const errors = {
        masterPublicKey: "",
      };

      if (!Wallet.isValidMasterPublicKey(values.masterPublicKey.trim())) {
        errors.masterPublicKey = "Please enter a valid master public key";
      }

      if (errors.masterPublicKey.length === 0) {
        return {};
      }

      return errors;
    },
    onSubmit: () => undefined,
  });

export const WalletImport = () => {
  const formik = useConfiguredFormik();
  const setInitialMasterPublicKey = useSetInitialMasterPublicKey();

  return (
    <Page title="Import Wallet" leftLink={<BackButton />}>
      <Textarea
        label="Master public key"
        placeholder="Enter your master public key"
        id="masterPublicKey"
        {...formik.getFieldProps("masterPublicKey")}
      />

      <p
        {...cn(
          styles.fontSize80Percent,
          styles.marginBottom1,
          styles.displayFlex,
          styles.alignItemsCenter,
          styles.colorRed,
          formik.touched.masterPublicKey && formik.errors.masterPublicKey
            ? styles.visibilityVisible
            : styles.visibilityHidden,
        )}
      >
        <Icon
          IconType={BsExclamationCircle}
          iconContextValue={{ color: "#b71c1c", size: "1em" }}
        />
        <span {...cn(styles.marginLeft1)}>{formik.errors.masterPublicKey}</span>
      </p>

      <div {...cn(styles.displayFlex, styles.justifyContentFlexEnd)}>
        <Button
          {...cn(styles.width25)}
          disabled={!!formik.errors.masterPublicKey}
          onClick={() =>
            setInitialMasterPublicKey(formik.values.masterPublicKey)
          }
        >
          Import
        </Button>
      </div>
    </Page>
  );
};
