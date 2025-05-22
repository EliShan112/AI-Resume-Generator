import './globals.css';
import Navbar from '@/components/Navbar';
import Providers from '@/components/Providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">

      
      <body className="min-h-screen flex flex-col ">
        <Providers>
          <Navbar />
          <main className="flex-grow flex flex-col">{children}</main>
        </Providers>
      </body>

    </html>
  );
}
