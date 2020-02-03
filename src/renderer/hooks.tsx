import { makeStyles, Typography, TypographyTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import clsx from "clsx";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RpcResponsesState } from "_r/redux/reducers/rpcResponses";

/**
 * `useInterval` is a React Hook that uses `setInterval` to execute a
 * callback repeatedly. It was built for making interval RPC server
 * calls to `bitcoind`. It's usage is simple (you can find it in the codebase).
 * But to understand the code below. See this:
 * https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */
type Callback = (intervalId: NodeJS.Timeout) => unknown;
export const useInterval = (callback: Callback, timeout: number) => {
  const savedCallback = useRef<Callback>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    const intervalId = setInterval(tick, timeout);

    function tick() {
      savedCallback.current!(intervalId);
    }
    tick();

    return () => clearInterval(intervalId);
  }, []);
};

/**
 * Doing
 *
 * ```typescript
 * const warnings = useRpcResponses(r => r.networkinfo?.warnings)
 * ```
 *
 * is more convenient than doing
 *
 * ```typescript
 * const warnings = useSelector(s => s.rpcResponses.networkinfo?.warnings)
 * ```
 *
 * That's what the below code is for.
 *
 * It also makes it possible to do:
 *
 * ```typescript
 * const allRpcResponses = useRpcResponses()
 * ```
 */
export function useRpcResponses<TSelected>(
  selector: (r: RpcResponsesState) => TSelected,
): TSelected;
export function useRpcResponses(): RpcResponsesState;
export function useRpcResponses(selector?: any) {
  return useSelector(s =>
    selector ? selector(s.rpcResponses) : s.rpcResponses,
  );
}

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
  const cn = useLoadingAwareTypographyStyles();

  return (props: any) => {
    const { children, isStatic, className, ...propsWithoutChildren } = props;
    const shouldHide = isLoading && !isStatic;

    return (
      <Typography
        {...propsWithoutChildren}
        className={clsx(className, shouldHide ? cn.transparent : null)}
      >
        <span className={clsx(shouldHide ? cn.skeleton : null)}>
          {children}
        </span>
      </Typography>
    );
  };
};
