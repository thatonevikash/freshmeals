import { extendTheme } from "@mui/material/styles";

import { typography } from "./core";

// -------------------------------------------------------------

export function createTheme() {
  const initialTheme = {
    colorSchemeSelector: "data",
    typography,
    shape: { borderRadius: 8 },
  };

  const theme = extendTheme(initialTheme);

  return theme;
}
