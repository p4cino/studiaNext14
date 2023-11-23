'use client';
import { ThemeProvider } from '@material-tailwind/react';

import { StickyNavbar } from '@/components/StickyNavbar/StickyNavbar';

import Footer from './components/Footer/Footer';

import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <html lang="en">
        <body>
          <div className="flex flex-col min-h-screen">
            <StickyNavbar />
            <div className="flex-grow">{children}</div>
            <Footer />
          </div>
        </body>
      </html>
    </ThemeProvider>
  );
}
