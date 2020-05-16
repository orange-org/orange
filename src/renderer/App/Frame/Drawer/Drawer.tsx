import { IconButton, Divider, SvgIcon, Paper } from "@material-ui/core";
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
import { CompensateToolbarHeight } from "_r/App/components/CompensateToolbarHeight/CompensateToolbarHeight";

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
        "displayFlex",
        "flexDirectionColumn",
        "height100vh",
        "backgroundColorPaper",
        "borderColorDivider",
        "borderRightStyleSolid",
        "borderWidth1px",
      )}
    >
      <CompensateToolbarHeight />
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
        "/explorer/300000",
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
