import { IconButton, Divider, SvgIcon } from "@material-ui/core";
import {
  ExploreOutlined,
  SettingsOutlined,
  AccountBalanceWalletOutlined,
} from "@material-ui/icons";
import React from "react";
import { useAtomicCss } from "_r/useAtomicCss";
import { Link, useLocation, matchPath } from "react-router-dom";
import { TestId, testIds } from "_tu/testIds";
import clsx from "clsx";

export const Drawer = () => {
  const a = useAtomicCss();
  const { pathname } = useLocation();
  const renderIcon = (
    Icon: typeof SvgIcon,
    title: string,
    to: string,
    testId: TestId,
  ) => {
    const isActive = !!matchPath(pathname, { path: to });

    return (
      <div
        className={clsx(a("padding1"), {
          [a(
            "borderWidth1",
            "borderLeftStyleSolid",
            "borderColorBlack60%Opaque",
            "paddingLeft0",
          )]: isActive,
        })}
      >
        <IconButton
          title={title}
          component={Link}
          to={to}
          className={clsx(
            a("disableHoverBackground", "hoverColorBlack60%Opaque"),
            {
              [a("colorBlack60%Opaque")]: isActive,
            },
          )}
          data-testid={testId}
        >
          <Icon />
        </IconButton>
      </div>
    );
  };
  const divider = <div className={a("marginTop02")} />;

  return (
    <div
      className={a(
        "backgroundColorPaper",
        "height100vh",
        "elevationRight1",
        "displayFlex",
        "flexDirectionColumn",
      )}
    >
      {divider}
      {renderIcon(
        ExploreOutlined,
        "Block chain explorer",
        "/explorer/300000",
        testIds.homeButton,
      )}
      {divider}
      {renderIcon(
        AccountBalanceWalletOutlined,
        "Wallet",
        "/wallet",
        testIds.navigateToWallet,
      )}
      {divider}
      {renderIcon(
        SettingsOutlined,
        "Settings",
        "/settings",
        testIds.settingsButton,
      )}
    </div>
  );
};
