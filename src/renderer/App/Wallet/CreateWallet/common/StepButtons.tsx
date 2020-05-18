import { Button, ButtonProps } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { useAtomicCss } from "_r/useAtomicCss";
import { steps } from "../CreateWalletWithNewKey/steps";

export const staticStepButtonProps = {
  variant: "contained",
  color: "primary",
} as const;

type StepName = {
  stepName: typeof steps[number];
};

export const StepButtons: React.FC<JSX.IntrinsicElements["div"]> = props => {
  const a = useAtomicCss();

  return (
    <div
      className={a("displayFlex", "justifyContentFlexEnd", "marginTop08")}
      {...props}
    />
  );
};

export const getNextStepLink = (stepName: typeof steps[number]) => {
  const stepIndex = steps.findIndex(step => stepName === step);
  const nextStepIndex = stepIndex + 1;

  return `/wallet/create/withNewKey/#${steps[nextStepIndex]}`;
};

export const NextButton: React.FC<ButtonProps<"button"> & StepName> = ({
  stepName,
  ...props
}) => {
  const a = useAtomicCss();

  const getProps = () =>
    props.onClick
      ? props
      : {
          ...props,
          component: Link,
          to: getNextStepLink(stepName),
          replace: true,
        };

  return (
    <Button
      className={a("marginLeft04")}
      {...staticStepButtonProps}
      {...getProps()}
    />
  );
};

export const BackButton: React.FC<ButtonProps<"button" & Link> & StepName> = ({
  stepName,
  ...props
}) => {
  const stepIndex = steps.findIndex(step => stepName === step);
  const previousStepIndex = stepIndex - 1;
  const previousTo = `/wallet/create/withNewKey/#${steps[previousStepIndex]}`;

  return (
    <Button
      variant="contained"
      color="default"
      {...props}
      component={Link}
      to={previousTo}
      replace
    >
      {props.children ? props.children : "Back"}
    </Button>
  );
};
