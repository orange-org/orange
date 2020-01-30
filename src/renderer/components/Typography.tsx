import {
  Typography as MaterialUiTypography,
  TypographyProps,
  makeStyles,
  Fade,
} from "@material-ui/core";
import clsx from "clsx";
import React, { ReactText } from "react";
import Skeleton, { SkeletonProps } from "@material-ui/lab/Skeleton";

export const Typography: React.FC<TypographyProps & {
  isLoading?: { active: boolean } & SkeletonProps;
}> = props_ => {
  const { children, isLoading, ...props } = props_;
  const active = isLoading?.active;

  delete isLoading?.active;

  return (
    <MaterialUiTypography {...props}>
      {active ? <Skeleton {...isLoading} /> : children}
    </MaterialUiTypography>
  );
};
