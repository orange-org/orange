import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

export const useCommonStyles = makeStyles(theme => {
  const c = (name: string, val: number | string) => ({
    [name]: val,
  });

  return {
    displayTable: {
      display: "table",
      tableLayout: "fixed",
      borderSpacing: `${theme.spacing(3)}px`,
    },

    topLevelComponent: {
      padding: "64px 0 0 0", // compensate for AppBar
      height: "100%",
    },

    alignItemsCenter: c("alignItems", "center"),

    displayTableRow: c("display", "table-row"),
    displayTableCell: c("display", "table-cell"),
    displayFlex: c("display", "flex"),
    displayGrid: c("display", "grid"),

    flexWrapWrap: c("flexWrap", "wrap"),
    flexShrink0: c("flexShrink", 0),

    flex1: c("flex", 1),

    fontWeight500: c("fontWeight", 500),

    fontStyleItalic: c("fontStyle", "italic"),

    marginTop1: c("marginTop", theme.spacing(1)),
    marginTop2: c("marginTop", theme.spacing(2)),
    marginTop5: c("marginTop", theme.spacing(5)),

    marginBottom10: c("marginBottom", theme.spacing(10)),

    marginLeft1: c("marginLeft", theme.spacing(1)),

    marginY2: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },

    marginX4: {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
    },

    justifyContentFlexEnd: c("justifyContent", "flex-end"),

    colorHint: c("color", theme.palette.text.hint),
    colorPrimary: c("color", theme.palette.text.primary),

    overflowScroll: c("overflow", "scroll"),

    padding2: c("padding", theme.spacing(2)),
    padding3: c("padding", theme.spacing(3)),
    padding6: c("padding", theme.spacing(6)),

    borderBottomWidth1: c("borderBottomWidth", 1),
    borderBottomStyleSolid: c("borderBottomStyle", "solid"),
    borderBottomColorDivider: c("borderBottomColor", theme.palette.divider),

    "width100%": c("width", "100%"),

    hoverBackgroundColor: {
      "&:hover": c("backgroundColor", theme.palette.action.hover),
    },
  };
});

export const useCcn = () => {
  const commonStyles = useCommonStyles();

  return (...classNames: (keyof ReturnType<typeof useCommonStyles>)[]) =>
    clsx(classNames.map(className => commonStyles[className]));
};
