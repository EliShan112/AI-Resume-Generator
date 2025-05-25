'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="w-full h-[12vh] flex items-center justify-between px-6 md:px-20 py-6 fixed top-0 z-50
  text-white bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-md transition-all duration-500">


      
      <Link href="/" className="text-2xl font-serif hover:scale-110 transition duration-300">
        AI Resume Generator
      </Link>

      <div className="hidden lg:flex items-center space-x-8 font-medium">
        <Link className="hover:text-white hover:bg-black transition px-3 py-2 rounded-xl" href="#">Pricing</Link>
        <Link className="hover:text-white hover:bg-black transition px-3 py-2 rounded-xl" href="#">Templates</Link>

        {session ? (
          <>
            <span className="font-semibold px-3 py-2">Hello, {session.user?.name}</span>
            <button onClick={() => signOut({ callbackUrl: '/' })} className="hover:bg-black hover:text-white px-3 py-2 rounded-xl cursor-pointer">Logout</button>
          </>
        ) : (
          <Link href="/login" className="hover:text-white hover:bg-black px-3 py-2 rounded-xl">Login</Link>
        )}
      </div>

      <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? <X /> : <Menu />}
      </button>

      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-start px-6 py-4 space-y-4 lg:hidden z-40 text-black">
          <Link href="#">Pricing</Link>
          <Link href="#">Templates</Link>
          {session ? (
            <>
              <span>Hello, {session.user?.name}</span>
              <Link href="#">Logged in</Link>
            </>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}
