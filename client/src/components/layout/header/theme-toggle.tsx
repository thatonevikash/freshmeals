"use client";

import { MoonStar, SunMedium } from "lucide-react";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { useColorScheme } from "@mui/material/styles";

export function ThemeToggle() {
  const { mode, setMode } = useColorScheme();

  if (!mode) return null;

  const isDark = mode === "dark";

  return (
    <Tooltip title={isDark ? "Switch to light mode" : "Switch to dark mode"}>
      <IconButton
        onClick={() => setMode(isDark ? "light" : "dark")}
        size="small"
        sx={{ border: "1px solid", borderColor: "divider", color: "text.primary" }}
      >
        {isDark ? <SunMedium size={18} /> : <MoonStar size={18} />}
      </IconButton>
    </Tooltip>
  );
}
