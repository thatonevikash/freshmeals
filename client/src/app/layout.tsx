import "@/globals.css";
import { AuthProvider } from "@/auth/context/auth-provider";

import { ThemeProvider } from "@/theme/theme-provider";
import { InitColorSchemeScript } from "@/theme/color-scheme-script";

// -------------------------------------------------------------

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript />

        <AuthProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
