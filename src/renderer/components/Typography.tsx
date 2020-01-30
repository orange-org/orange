import {
  Typography as MaterialUiTypography,
  TypographyProps,
} from "@material-ui/core";
import Skeleton, { SkeletonProps } from "@material-ui/lab/Skeleton";
import React from "react";

export const Typography: React.FC<TypographyProps & {
  isLoading?: { active: boolean } & SkeletonProps;
}> = props_ => {
  const { children, isLoading, ...props } = props_;

  if (isLoading?.active) {
    const { active, ...skeletonProps } = isLoading;

    return (
      <MaterialUiTypography {...props}>
        <Skeleton {...skeletonProps} />
      </MaterialUiTypography>
    );
  }

  return <MaterialUiTypography {...props}>{children}</MaterialUiTypography>;
};
