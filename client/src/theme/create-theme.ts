import { extendTheme } from "@mui/material/styles";

import { typography, colorSchemes } from "./core";

export function createTheme() {
  return extendTheme({
    colorSchemeSelector: "data",
    colorSchemes,
    typography,
    shape: { borderRadius: 10 },
  });
}
