import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import { grey } from "@material-ui/core/colors";

export const theme: ThemeOptions = {
  spacing: 4,

  palette: {
    text: {
      primary: "rgba(0, 0, 0, 0.70)",
    },

    background: {
      default: grey[100],
    },

    primary: {
      light: "#ffffff",
      main: "#1976d2",
      dark: "#c7c7c7",
      contrastText: "#000000",
    },
    secondary: {
      light: "#ffa040",
      main: "#ff6f00",
      dark: "#c43e00",
      contrastText: "#fafafa",
    },
  },

  typography: {
    h1: {
      fontSize: "2rem",
    },

    h2: {
      fontSize: "1.3rem",
      fontWeight: 400,
    },

    h3: {
      fontSize: "1.1rem",
    },

    h4: {
      fontSize: "1.06rem",
    },

    h5: {
      fontSize: "1.03rem",
    },

    h6: {
      fontSize: "1rem",
    },

    body1: {
      fontSize: "0.9rem",
    },

    body2: {
      fontSize: "0.8rem",
    },
  },

  overrides: {
    MuiButton: {
      root: {
        textTransform: "inherit",
      },
    },
  },

  props: {
    MuiPaper: {
      variant: "outlined",
    },

    MuiButtonBase: {
      disableRipple: true,
      disableTouchRipple: true,
    },

    MuiButton: {
      disableFocusRipple: true,
    },
  },
};
