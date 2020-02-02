import { Typography, TypographyTypeMap } from "@material-ui/core";
import Skeleton, { SkeletonProps } from "@material-ui/lab/Skeleton";
import React from "react";
import clsx from "clsx";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

export const getLoadingAwareTypography = (
  config: { active: boolean } & SkeletonProps,
): OverridableComponent<TypographyTypeMap<
  {} | { skeleton?: SkeletonProps },
  "span"
>> => {
  const { active, ...skeletonProps } = config;
  const LoadingAwareTypography: OverridableComponent<TypographyTypeMap<
    { skeleton?: SkeletonProps },
    "span"
  >> = (props_: any) => {
    const { skeleton, ...props } = props_;

    return (
      <Typography {...props}>
        <Skeleton {...skeletonProps} {...skeleton} />
      </Typography>
    );
  };

  return active ? LoadingAwareTypography : Typography;
};

export const getLoadingAwareTypography2 = (config: {
  isLoading: boolean;
  className: string;
  transitionClass: string;
  none: string;
}) => {
  const { none, isLoading, className, transitionClass } = config;

  const LoadingAwareTypography: typeof Typography = (props: any) => {
    const { children, ...propsWithoutChildren } = props;

    return (
      <Typography {...propsWithoutChildren}>
        <span className={clsx(isLoading ? className : none, transitionClass)}>
          {children}
        </span>
      </Typography>
    );
  };

  return true ? LoadingAwareTypography : Typography;
};
