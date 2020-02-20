import * as CSS from "csstype";
import { makeStyles, fade } from "@material-ui/core";
import clsx from "clsx";

export const BLOCK_SCROLLABLE_CONTAINER_FULL_WIDTH = 82;

const useAtomicStyles = makeStyles(theme => {
  const c = (
    name: keyof CSS.Properties<number | string>,
    val: number | string,
  ) => ({
    [name]: val,
  });

  /* eslint sort-keys: "error" */
  return {
    alignItemsCenter: c("alignItems", "center"),

    backgroundColorBlackFade01: c(
      "backgroundColor",
      fade(theme.palette.common.black, 0.1),
    ),
    backgroundColorDefault: c(
      "backgroundColor",
      theme.palette.background.default,
    ),

    borderBottomColorDivider: c("borderBottomColor", theme.palette.divider),
    borderBottomStyleSolid: c("borderBottomStyle", "solid"),
    borderBottomWidth1: c("borderBottomWidth", 1),

    borderColorDividerFade06: c(
      "borderColor",
      fade(theme.palette.divider, 0.06),
    ),

    borderLeftStyleSolid: c("borderLeftStyle", "solid"),

    borderRadiusShape: c("borderRadius", theme.shape.borderRadius),

    borderWidth2: c("borderWidth", 2),
    borderWidth4: c("borderWidth", 4),

    colorActionActive: c("color", theme.palette.action.active),
    colorHint: c("color", theme.palette.text.hint),
    colorPrimary: c("color", theme.palette.text.primary),

    displayFlex: c("display", "flex"),
    displayGrid: c("display", "grid"),
    displayTable: {
      borderSpacing: `${theme.spacing(3)}px`,
      display: "table",
      tableLayout: "fixed",
    },
    displayTableCell: c("display", "table-cell"),
    displayTableRow: c("display", "table-row"),

    flex1: c("flex", 1),
    flexShrink0: c("flexShrink", 0),
    flexWrapWrap: c("flexWrap", "wrap"),

    fontStyleItalic: c("fontStyle", "italic"),

    fontWeight500: c("fontWeight", 500),

    "height100%": c("height", "100%"),

    hoverBackgroundColor: {
      "&:hover": c("backgroundColor", theme.palette.action.hover),
    },
    hoverBackgroundColorBlackFade012: {
      "&:hover": c("backgroundColor", fade(theme.palette.common.black, 0.12)),
    },

    justifyContentCenter: c("justifyContent", "center"),
    justifyContentFlexEnd: c("justifyContent", "flex-end"),

    marginBottom10: c("marginBottom", theme.spacing(10)),

    marginLeft01: c("marginLeft", theme.spacing(1)),
    marginLeft02: c("marginLeft", theme.spacing(2)),
    marginLeft10: c("marginLeft", theme.spacing(10)),

    marginRight02: c("marginRight", theme.spacing(2)),

    marginTop01: c("marginTop", theme.spacing(1)),
    marginTop02: c("marginTop", theme.spacing(2)),
    marginTop05: c("marginTop", theme.spacing(5)),

    marginX04: {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
    },
    marginX05: {
      marginLeft: theme.spacing(5),
      marginRight: theme.spacing(5),
    },

    marginY02: {
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2),
    },
    marginY10: {
      marginBottom: theme.spacing(10),
      marginTop: theme.spacing(10),
    },

    minWidthUnset: c("minWidth", "unset"),

    overflowScroll: c("overflow", "scroll"),
    overflowXHidden: c("overflowX", "hidden"),
    overflowYScroll: c("overflowY", "scroll"),

    padding0: c("padding", 0),
    padding2: c("padding", theme.spacing(2)),
    padding3: c("padding", theme.spacing(3)),
    padding6: c("padding", theme.spacing(6)),

    paddingLeft0: c("paddingLeft", 0),
    paddingLeft2: c("paddingLeft", theme.spacing(2)),

    paddingTop1: c("paddingTop", theme.spacing(1)),
    paddingTop2: c("paddingTop", theme.spacing(2)),

    pointerEventsNone: c("pointerEvents", "none"),

    positionAbsolute: c("position", "absolute"),
    positionRelative: c("position", "relative"),

    scrollbarWidth0: {
      "&::-webkit-scrollbar": c("width", 0),
    },

    topLevelComponent: {
      height: "100%",
      padding: "64px 0 0 0", // compensate for AppBar
    },

    "width100%": c("width", "100%"),
    width11: c("width", theme.spacing(11)),
    widthAuto: c("width", "auto"),
  };
  /* eslint-disable sort-keys */
});

export const useAtomicCss = () => {
  const atomicStyles = useAtomicStyles();

  return (...classNames: (keyof ReturnType<typeof useAtomicStyles>)[]) =>
    clsx(classNames.map(className => atomicStyles[className]));
};
