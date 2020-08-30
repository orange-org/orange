import React from "react";
import { Icon } from "src/App/common/Icon";
import { FiChevronLeft } from "react-icons/fi";
import styles from "src/styles.css";
import { cn } from "src/cn";
import { useHistory } from "react-router-dom";

export const BackButton = () => {
  const history = useHistory();

  return (
    <button
      type="button"
      {...cn(
        styles.borderNone,
        styles.backgroundTransparent,
        styles.displayFlex,
        styles.alignItemsCenter,
        styles.padding0,
      )}
      onClick={() => history.goBack()}
    >
      <Icon IconType={FiChevronLeft} />
      <span>Back</span>
    </button>
  );
};
