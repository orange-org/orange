import {
  Typography as MaterialUiTypography,
  TypographyTypeMap,
} from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import Skeleton, { SkeletonProps } from "@material-ui/lab/Skeleton";
import React from "react";

export const Typography: OverridableComponent<TypographyTypeMap<
  {
    isLoading?: { active: boolean } & SkeletonProps;
  },
  "span"
>> = (props_: any) => {
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
