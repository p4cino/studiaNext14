import { ReactNode } from 'react';

import type { Metadata } from 'next';

import Footer from '@/components/Footer/Footer';
import { StickyNavbar } from '@/components/StickyNavbar/StickyNavbar';
import Provider from '@/providers/Provider';
import { ThemeProvider } from '@/providers/ThemeProvider';

import './globals.css';

export const metadata: Metadata = {
  title: 'Studia NextJS 14',
  description: 'Wojciech Puzio',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <Provider>
        <html lang="en">
          <body>
            <StickyNavbar />
            <div className="flex flex-col min-h-screen">
              <div className="flex-grow">{children}</div>
              <Footer />
            </div>
          </body>
        </html>
      </Provider>
    </ThemeProvider>
  );
}
