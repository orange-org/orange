import { makeStyles, Typography, TypographyTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import clsx from "clsx";
import React from "react";

const useLoadingAwareTypographyStyles = makeStyles({
  "@keyframes shine": {
    from: {
      backgroundPosition: "100%",
    },
    to: {
      backgroundPosition: "-100%",
    },
  },

  skeleton: {
    position: "relative",
    display: "inline-block",

    "&::before": {
      animation: "$shine 1s infinite",
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      content: "''",
      background:
        "linear-gradient(138deg, rgba(242,242,242,0.4) 28%, rgba(255,255,255,0.9) 46%, rgba(242,242,242,0.4) 57%)",
      backgroundColor: "rgba(242,242,242,0.4)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "200%",
      opacity: 1,
    },
  },

  transparent: {
    color: "transparent !important",
  },
});

export const useLoadingAwareTypography = (
  isLoading: boolean,
): OverridableComponent<TypographyTypeMap<{ isStatic?: boolean }, "span">> => {
  const classNames = useLoadingAwareTypographyStyles();

  return (props: any) => {
    const { children, isStatic, className, ...propsWithoutChildren } = props;
    const shouldHide = isLoading && !isStatic;

    return (
      <Typography
        {...propsWithoutChildren}
        className={clsx(className, shouldHide ? classNames.transparent : null)}
      >
        {shouldHide ? (
          <span className={classNames.skeleton}>{children}</span>
        ) : (
          children
        )}
      </Typography>
    );
  };
};
