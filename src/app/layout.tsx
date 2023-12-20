import Footer from '@/components/Footer/Footer';
import { StickyNavbar } from '@/components/StickyNavbar/StickyNavbar';
import Provider from '@/providers/Provider';
import { ThemeProvider } from '@/providers/ThemeProvider';

import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <html lang="en">
        <body>
          <div className="flex flex-col min-h-screen">
            <Provider>
              <StickyNavbar />
              <div className="flex-grow">{children}</div>
              <Footer />
            </Provider>
          </div>
        </body>
      </html>
    </ThemeProvider>
  );
}
