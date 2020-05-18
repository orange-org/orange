import { IconButton, SvgIcon } from "@material-ui/core";
import {
  AccountBalanceWalletOutlined,
  ExploreOutlined,
  SettingsOutlined,
} from "@material-ui/icons";
import clsx from "clsx";
import React from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import { useAtomicCss } from "_r/useAtomicCss";
import { TestId, testIds } from "_tu/testIds";

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
        className={clsx(a("padding2"), {
          [a(
            "borderWidth1",
            "borderLeftStyleSolid",
            "borderColorSecondaryMain",
            "paddingLeft1",
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
          <Icon className={a("fontSize110%")} />
        </IconButton>
      </div>
    );
  };
  const divider = <div className={a("marginTop02")} />;

  return (
    <div
      className={a(
        "topLevelComponent",
        "displayFlex",
        "flexDirectionColumn",
        "backgroundColorPaper",
        "borderColorDivider",
        "borderRightStyleSolid",
        "borderWidth1px",
      )}
    >
      {divider}
      {renderIcon(
        AccountBalanceWalletOutlined,
        "Wallet",
        "/wallet",
        testIds.navigateToWallet,
      )}
      {divider}
      {renderIcon(
        ExploreOutlined,
        "Block chain explorer",
        "/explorer",
        testIds.homeButton,
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
