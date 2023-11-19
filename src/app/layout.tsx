'use client';
import { ThemeProvider } from '@material-tailwind/react';

import { StickyNavbar } from '@/components/StickyNavbar/StickyNavbar';

import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <html lang="en">
        <body>
          <StickyNavbar />
          {children}
        </body>
      </html>
    </ThemeProvider>
  );
}
