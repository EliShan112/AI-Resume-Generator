// app/layout.tsx
import './globals.css';
import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';
import { Toaster } from 'react-hot-toast';
import PageWrapper from '@/components/PageWrapper';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Providers>
          <PageWrapper>
          <Navbar />
          <main className="flex-grow pt-[12vh]">
            {children}
          </main>
        </PageWrapper>
        </Providers>
      </body>
    </html>
  );
}
