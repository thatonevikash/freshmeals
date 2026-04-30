"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";

import { createTheme } from "./create-theme";
import { schemeConfig } from "./color-scheme-script";

// ----------------------------------------------------------------------

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = createTheme();

  return (
    <AppRouterCacheProvider options={{ key: "css" }}>
      <MuiThemeProvider
        theme={theme}
        modeStorageKey={schemeConfig.modeStorageKey}
      >
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </AppRouterCacheProvider>
  );
}
