import MuiInitColorSchemeScript from "@mui/material/InitColorSchemeScript";

export const schemeConfig = {
  attribute: "data",
  modeStorageKey: "theme-mode",
};

// -------------------------------------------------------------

export const InitColorSchemeScript = () => (
  <MuiInitColorSchemeScript {...schemeConfig} />
);
