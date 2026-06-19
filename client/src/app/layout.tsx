import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";

import { InitColorSchemeScript, ThemeProvider } from "@/theme/theme-provider";
import { AuthProvider } from "@/auth/context/auth-provider";

// ---------------------------------------------------------------

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <InitColorSchemeScript />

        <AuthProvider>
          <ThemeProvider> {children} </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
