import { alpha } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }

  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
  }
}

const basePalette = {
  primary: {
    light: "#5FAE7D",
    main: "#2E8B57",
    dark: "#1F5F3B",
    contrastText: "#FFFFFF",
  },
  secondary: {
    light: "#FFD47A",
    main: "#FFB940",
    dark: "#C8891D",
    contrastText: "#1B1B1B",
  },
  success: {
    light: "#57C08D",
    main: "#2D9D6A",
    dark: "#1D6E49",
    contrastText: "#FFFFFF",
  },
  warning: {
    light: "#FFCF66",
    main: "#F4A62A",
    dark: "#B57611",
    contrastText: "#1F1F1F",
  },
  neutral: {
    light: "#AAB3C5",
    main: "#5B667C",
    dark: "#2A3140",
    contrastText: "#FFFFFF",
  },
};

const lightPalette = {
  ...basePalette,
  grey: {
    50: "#FAFAF7",
    100: "#F3F4EF",
    200: "#E4E7DE",
    300: "#CBD1C2",
    400: "#9AA59A",
    500: "#69786E",
    600: "#4B594F",
    700: "#364238",
    800: "#222A24",
    900: "#131814",
  },
  background: {
    default: "#FAFAF7",
    paper: "#FFFFFF",
  },
  text: {
    primary: "#1E2620",
    secondary: "#5E6A61",
    disabled: alpha("#1E2620", 0.4),
  },
  divider: alpha("#5E6A61", 0.18),
};

const darkPalette = {
  ...basePalette,
  background: {
    default: "#101512",
    paper: "#161D19",
  },
  text: {
    primary: "#E8F1EA",
    secondary: "#A7B6AD",
    disabled: alpha("#E8F1EA", 0.48),
  },
  divider: alpha("#A7B6AD", 0.22),
};

export const colorSchemes = {
  light: { palette: lightPalette },
  dark: { palette: darkPalette },
};
