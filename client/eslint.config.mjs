import perfectionist from "eslint-plugin-perfectionist";
import unusedImports from "eslint-plugin-unused-imports";
import nextTypescript from "eslint-config-next/typescript";
import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  ...nextVitals,
  ...nextTypescript,
  {
    plugins: {
      perfectionist,
      "unused-imports": unusedImports,
    },
    rules: {
      "unused-imports/no-unused-imports": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-vars": [
        "off",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          vars: "all",
          varsIgnorePattern: "^_",
        },
      ],
      "perfectionist/sort-imports": [
        "error",
        {
          order: "asc",
          ignoreCase: true,
          type: "line-length",
          specialCharacters: "keep",
          internalPattern: ["^@/.*"],
          groups: [
            "react",
            "next",
            "mui",
            "external",
            "type",
            "internal-types",
            "internal-lib",
            "internal-hooks",
            "internal-actions",
            "internal-components",
            "internal-auth",
            "internal-routes",
            "internal-theme",
            "internal",
            ["parent", "sibling", "index"],
            "icons",
            "object",
            "unknown",
          ],
          customGroups: {
            value: {
              react: ["react"],
              next: ["^next", "^next/.*", "cookies-next"],
              mui: ["^@mui/.*", "^@emotion/.*"],
              icons: ["^lucide-react$"],
              "internal-types": ["^@/types/.*"],
              "internal-lib": ["^@/lib/.*"],
              "internal-actions": ["^@/actions/.*"],
              "internal-hooks": ["^@/hooks/.*"],
              "internal-components": ["^@/components/.*"],
              "internal-auth": ["^@/auth/.*"],
              "internal-routes": ["^@/routes/.*"],
              "internal-theme": ["^@/theme/.*"],
            },
          },
          newlinesBetween: "always",
        },
      ],
    },
  },
];

export default config;
