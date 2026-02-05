import React from 'react';
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let theme = process.env.NEXT_PUBLIC_THEME || "theme-sass3";
  const gaID = process.env.NEXT_PUBLIC_GOOGLE_TAG;

  return (
    <html lang="en">
      <body className={theme}>
        {children}
        {gaID && <GoogleAnalytics gaId={gaID} />}
      </body>
    </html>
  );
}
