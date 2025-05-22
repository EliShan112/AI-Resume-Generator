'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {data: session, status} = useSession();

  return (
    <nav className="w-full h-[12vh] flex items-center justify-between px-6 md:px-20 py-6 bg-white shadow-md fixed top-0 z-50">
    <Link className='text-black text-2xl font-serif transition duration-1000 ease-in-out px-3 py-2 cursor-pointer hover:scale-120' href="/">Ai Resume Generator</Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-8 text-black font-medium">
        <Link className='hover:text-white transition duration-300 ease-in-out hover:bg-black hover:shadow-md px-3 py-2 rounded-xl cursor-pointer' href="/">Pricing</Link>
        <Link className='hover:text-white transition duration-300 ease-in-out hover:bg-black hover:shadow-md px-3 py-2 rounded-xl cursor-pointer' href="#">Templates</Link>
        {session?(
          <>
          <span className='text-black font-semibold cursor-pointer hover:shadow-md px-3 py-2 rounded-xl'>Hello, {session.user?.name}</span>
          <Link  href="/login" className='hover:shadow-md px-3 py-2 rounded-xl cursor-pointer'>Logged in</Link>
          <button className='hover:shadow-md px-3 py-2 rounded-xl cursor-pointer' onClick={()=>signOut({callbackUrl: '/'})}>Logout</button>
          </>
        ):(

        <Link  href="/login" className='hover:text-white transition duration-300 ease-in-out hover:bg-black hover:shadow-md px-3 py-2 rounded-xl cursor-pointer'>Login</Link>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-start px-6 py-4 space-y-4 md:hidden z-40 text-black">
          <Link href="#">Pricing</Link>
          <Link href="#">Templates</Link>
          {session?(
            <>
            <span className='text-black font-semibold cursor-pointer'>Hello, {session.user?.name}</span>
            <Link href="#">logged in</Link>
            </>
          ):(

          <Link href="#">Login</Link>
          )}
          
        </div>
      )}
    </nav>
  );
}
