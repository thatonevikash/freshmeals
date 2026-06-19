import { Theme, Components } from "@mui/material";

import type {} from "@mui/material/themeCssVarsAugmentation";

// ---------------------------------------------------------------

const MuiButtonBase: Components<Theme>["MuiButtonBase"] = {
  styleOverrides: {
    root: ({ theme }) => ({ fontFamily: theme.typography.fontFamily }),
  },
};

// ---------------------------------------------------------------

const MuiButton: Components<Theme>["MuiButton"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      textTransform: "unset",
      borderRadius: theme.spacing(1),
      color: theme.vars.palette.common.black,
      variants: [
        {
          props: { variant: "contained" },
          style: {
            borderRadius: theme.spacing(1),
            color: theme.vars.palette.common.white,
            backgroundColor: theme.vars.palette.grey[900],
            ...theme.applyStyles("dark", {
              color: theme.vars.palette.common.black,
              backgroundColor: theme.vars.palette.grey[100],
            }),
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            borderRadius: theme.spacing(1),
            color: theme.vars.palette.common.black,
            borderColor: theme.vars.palette.grey[900],
            ...theme.applyStyles("dark", {
              color: theme.vars.palette.common.white,
              borderColor: theme.vars.palette.grey[100],
            }),
          },
        },
      ],
    }),
    sizeSmall: () => ({
      height: 32,

      variants: [
        {
          props: { variant: "text" },
          style: { paddingLeft: "4px", paddingRight: "4px" },
        },
        {
          props: ({ ownerState }) => ownerState.variant !== "text",
          style: { paddingLeft: "8px", paddingRight: "8px" },
        },
      ],
    }),
    sizeMedium: () => ({
      variants: [
        {
          props: { variant: "text" },
          style: { paddingLeft: "8px", paddingRight: "8px" },
        },
        {
          props: ({ ownerState }) => ownerState.variant !== "text",
          style: { paddingLeft: "12px", paddingRight: "12px" },
        },
      ],
    }),
    sizeLarge: () => ({
      height: 48,

      variants: [
        {
          props: { variant: "text" },
          style: { paddingLeft: "10px", paddingRight: "10px" },
        },
        {
          props: ({ ownerState }) => ownerState.variant !== "text",
          style: { paddingLeft: "16px", paddingRight: "16px" },
        },
      ],
    }),
  },
};

// -------------------------------------------------------------

export { MuiButton, MuiButtonBase };
