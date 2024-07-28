 "use client";
import { useState } from 'react';
import { AlignJustify, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SignOutButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header() {
  const path = usePathname();
  const { user, isSignedIn } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className='p-6 px-4 md:px-10 flex justify-between shadow-sm fixed top-0 w-full z-10 bg-white'>
      <div className='flex gap-4 md:gap-12 items-center'>
        <div className='flex items-center gap-2'>
          <Image src={'/logo.svg'} width={30} height={30} alt='logo' />
          <Link href={'/'} className='text-2xl font-bold'>
            RealEstatePro
          </Link>
        </div>
        <ul className='hidden md:flex gap-10'>
          <Link href={'/'}>
            <li className={`hover:text-primary font-medium text-lg cursor-pointer ${path === '/' && 'text-primary'}`}>For Sell</li>
          </Link>
          <Link href={'/rent'}>
            <li className={`hover:text-primary font-medium text-lg cursor-pointer ${path === '/rent' && 'text-primary'}`}>For Rent</li>
          </Link>
        </ul>
        {/* Hamburger menu for mobile */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-500 focus:outline-none">
            <AlignJustify className="h-6 w-6" />
          </button>
          {menuOpen && (
            <div className="absolute mt-2 w-36 bg-white rounded-lg shadow-lg py-2">
              <Link href={'/'}>
                <p className={`block px-4 py-2 text-sm cursor-pointer ${path === '/' && 'text-primary'}`}>For Sell</p>
              </Link>
              <Link href={'/rent'}>
                <p className={`block px-4 py-2 text-sm cursor-pointer ${path === '/rent' && 'text-primary'}`}>For Rent</p>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className='flex gap-2 items-center'>
        <Link href={'/add-new-listing'}>
          <Button className="flex gap-2 md:gap-4 text-xs md:text-sm">
            <Plus className='h-4 w-4 md:h-5 md:w-5' />
            <span className="hidden md:block">Post Your Ad</span>
          </Button>
        </Link>
        {isSignedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image src={user?.imageUrl} width={35} height={35} alt='user profile' className='rounded-full' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={'/user'}>Profile</Link>
              </DropdownMenuItem>
              {/*<DropdownMenuItem>
                <Link href={'/user#/my-listing'}>
                  My Listing
                </Link>
              </DropdownMenuItem>*/}
              <DropdownMenuItem>
                <SignOutButton>Logout</SignOutButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href={'/sign-in'}>
            <Button variant="outline" className="text-xs md:text-sm">Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
