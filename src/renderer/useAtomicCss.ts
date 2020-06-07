import * as CSS from "csstype";
import { makeStyles, fade, Theme } from "@material-ui/core";
import clsx from "clsx";

export const BLOCK_SCROLLABLE_CONTAINER_FULL_WIDTH = 82;

export const getAtomicCssAndStyleGroups = (theme: Theme) => {
  const c = (
    name: keyof CSS.Properties<number | string>,
    val: number | string,
  ) => ({
    [name]: val,
  });

  /* eslint sort-keys: "error" */
  const atomicCss = {
    alignItemsCenter: c("alignItems", "center"),

    "backgroundColorBlack10%Opaque": c(
      "backgroundColor",
      fade(theme.palette.common.black, 0.1),
    ),
    backgroundColorDefault: c(
      "backgroundColor",
      theme.palette.background.default,
    ),
    "backgroundColorPaper90%Opaque": c(
      "backgroundColor",
      fade(theme.palette.background.paper, 0.9),
    ),
    backgroundColorWhite: c("backgroundColor", theme.palette.common.white),

    borderBottomColorDivider: c("borderBottomColor", theme.palette.divider),
    borderBottomStyleSolid: c("borderBottomStyle", "solid"),
    borderBottomWidth1: c("borderBottomWidth", 1),

    borderColorDivider: c("borderColor", theme.palette.divider),
    borderColorDividerFade06: c(
      "borderColor",
      fade(theme.palette.divider, 0.06),
    ),
    borderColorSecondaryMain: c("borderColor", theme.palette.secondary.main),

    borderLeftStyleSolid: c("borderLeftStyle", "solid"),

    borderRadius0: c("borderRadius", 0),
    borderRadius4px: c("borderRadius", "4px"),

    borderRadiusShape: c("borderRadius", theme.shape.borderRadius),

    borderRightStyleSolid: c("borderRightStyle", "solid"),

    borderStyleSolid: c("borderStyle", "solid"),

    borderTopStyleSolid: c("borderTopStyle", "solid"),

    borderWidth1px: c("borderWidth", 1),
    borderWidth2px: c("borderWidth", 2),
    borderWidth4px: c("borderWidth", 4),

    bottom0: c("bottom", 0),
    bottomNegative10: c("bottom", theme.spacing(-10)),

    colorActionActive: c("color", theme.palette.action.active),
    colorDivider: c("color", theme.palette.divider),
    colorHint: c("color", theme.palette.text.hint),
    colorPrimary: c("color", theme.palette.text.primary),
    "colorPrimary50%Opaque": c("color", fade(theme.palette.text.primary, 0.5)),
    "colorPrimary70%Opaque": c("color", fade(theme.palette.text.primary, 0.7)),
    colorSecondary: c("color", theme.palette.text.secondary),
    colorTransparent: c("color", "transparent"),
    colorWhite: c("color", theme.palette.common.white),

    directionRtl: c("direction", "rtl"),

    displayFlex: c("display", "flex"),
    displayGrid: c("display", "grid"),
    displayInline: c("display", "inline"),
    displayTable: {
      borderSpacing: `${theme.spacing(3)}px`,
      display: "table",
      tableLayout: "fixed",
    },
    displayTableCell: c("display", "table-cell"),
    displayTableRow: c("display", "table-row"),

    flex1: c("flex", 1),
    "flexBasis50%": c("flexBasis", "50%"),
    flexDirectionColumn: c("flexDirection", "column"),
    flexDirectionRowReverse: c("flexDirection", "row-reverse"),
    flexGrow0: c("flexGrow", 0),
    flexGrow1: c("flexGrow", 1),
    flexShrink0: c("flexShrink", 0),
    flexWrapWrap: c("flexWrap", "wrap"),

    fontFamilyMonospace: c("fontFamily", "monospace"),

    "fontSize0.8Rem": c("fontSize", "0.8rem"),
    "fontSize110%": c("fontSize", "110%"),
    "fontSize130%": c("fontSize", "130%"),
    "fontSize95%": c("fontSize", "95%"),

    fontStyleItalic: c("fontStyle", "italic"),

    fontWeight500: c("fontWeight", 500),

    "height100%": c("height", "100%"),

    hoverBackgroundColor: {
      "&:hover": c("backgroundColor", theme.palette.action.hover),
    },
    "hoverBackgroundColorBlack12%Opaque": {
      "&:hover": c("backgroundColor", fade(theme.palette.common.black, 0.12)),
    },

    justifyContentCenter: c("justifyContent", "center"),
    justifyContentFlexEnd: c("justifyContent", "flex-end"),

    left0: c("left", 0),

    letterSpacing2px: c("letterSpacing", "2px"),

    lineHeight0: c("lineHeight", 0),
    lineHeightNormal: c("lineHeight", "normal"),

    marginBottom10: c("marginBottom", theme.spacing(10)),

    marginLeft01: c("marginLeft", theme.spacing(1)),
    marginLeft02: c("marginLeft", theme.spacing(2)),
    marginLeft04: c("marginLeft", theme.spacing(4)),
    marginLeft08: c("marginLeft", theme.spacing(8)),
    marginLeft10: c("marginLeft", theme.spacing(10)),

    marginLeftAuto: c("marginLeft", "auto"),

    marginRight02: c("marginRight", theme.spacing(2)),
    marginRightAuto: c("marginRight", "auto"),
    marginRightNegative08: c("marginRight", theme.spacing(-8)),

    marginTop01: c("marginTop", theme.spacing(1)),
    marginTop02: c("marginTop", theme.spacing(2)),
    marginTop05: c("marginTop", theme.spacing(5)),
    marginTop16: c("marginTop", theme.spacing(16)),

    marginTopNegative02: c("marginTop", -theme.spacing(2)),

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
    marginY05: {
      marginBottom: theme.spacing(5),
      marginTop: theme.spacing(5),
    },
    marginY10: {
      marginBottom: theme.spacing(10),
      marginTop: theme.spacing(10),
    },

    maxWidth800: c("maxWidth", 800),

    "minWidth100%": c("minWidth", "100%"),
    "minWidth50%": c("minWidth", "50%"),
    minWidthUnset: c("minWidth", "unset"),

    overflowHidden: c("overflow", "hidden"),
    overflowScroll: c("overflow", "scroll"),
    overflowVisible: c("overflow", "visible"),
    overflowXHidden: c("overflowX", "hidden"),
    overflowYScroll: c("overflowY", "scroll"),

    padding0: c("padding", 0),
    padding1: c("padding", theme.spacing(1)),
    padding2: c("padding", theme.spacing(2)),
    padding3: c("padding", theme.spacing(3)),
    padding6: c("padding", theme.spacing(6)),

    paddingLeft0: c("paddingLeft", 0),
    paddingLeft2: c("paddingLeft", theme.spacing(2)),

    paddingTop1: c("paddingTop", theme.spacing(1)),
    paddingTop2: c("paddingTop", theme.spacing(2)),

    paddingX4: {
      paddingBottom: theme.spacing(4),
      paddingTop: theme.spacing(4),
    },

    pointerEventsNone: c("pointerEvents", "none"),

    positionAbsolute: c("position", "absolute"),
    positionRelative: c("position", "relative"),

    right0: c("right", 0),

    scrollbarWidth0: {
      "&::-webkit-scrollbar": c("width", 0),
    },

    textAlignCenter: c("textAlign", "center"),

    textOverflowEllipsis: c("textOverflow", "ellipsis"),

    top0: c("top", 0),

    topNegative10: c("top", theme.spacing(-10)),

    whiteSpaceNoWrap: c("whiteSpace", "nowrap"),

    "width100%": c("width", "100%"),
    width11: c("width", theme.spacing(11)),
    width40: c("width", theme.spacing(40)),
    widthAuto: c("width", "auto"),
    widthFitContent: c("width", "fit-content"),

    zIndex2: c("zIndex", 2),
    zIndex3: c("zIndex", 3),
    zIndexDrawerPlus1: c("zIndex", theme.zIndex.drawer + 1),
  } as const;

  const styleGroups = {
    helperText: {
      ...atomicCss["colorPrimary50%Opaque"],
      ...atomicCss["fontSize0.8Rem"],
      ...atomicCss.marginTop01,
    },
    topLevelComponent: {
      height: `calc(100% - ${theme.spacing(16)}px)`,
      ...atomicCss.marginTop16, // compensate for AppBar
    },
  } as const;
  /* eslint-disable sort-keys */

  return { atomicCss, styleGroups };
};

const useAtomicStyles = makeStyles(
  theme => {
    const { atomicCss, styleGroups } = getAtomicCssAndStyleGroups(theme);

    return { ...atomicCss, ...styleGroups };
  },

  /**
   * In production the style rules above get added first, which means they get
   * overridden by more later added styles. Using `index: 1` here causes them
   * to be added later. This way they gain more specificity.
   */
  { index: 1 },
);

type AtomicCssKeys = keyof ReturnType<typeof useAtomicStyles>;
export type AtomicCssKeysArray = (AtomicCssKeys | AtomicCssKeys[] | null)[];

export const useAtomicCss = () => {
  const atomicStyles = useAtomicStyles();

  return (...classNames: AtomicCssKeysArray) =>
    clsx(
      classNames.map(className => {
        if (className === null) {
          return null;
        }

        /* istanbul ignore next: no use-case for this yet */
        if (Array.isArray(className)) {
          return className.map(className_ => atomicStyles[className_]);
        }

        return atomicStyles[className];
      }),
    );
};
