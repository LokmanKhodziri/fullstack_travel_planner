"use client";

import { loginWithGoogle, loginWithGitHub, logout } from "@/lib/auth-actions";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default function Navbar({ session }: { session: Session | null }) {
  return (
    <nav className='bg-white shadow-md py-4 border-b border-gray-200'>
      <div className='container mx-auto flex justify-between itmes-center px-6 lg:px-8'>
        <Link href='/' className='flex items-center'>
          <Image src={"/logo.png"} alt='logo' width={50} height={50} />
          <span className='text-2xl font-bold text-gray-800'>
            Travel Planner
          </span>
        </Link>
        <div className='flex items-center space-x-4'>
          {session ? (
            <>
              <Link
                href={"/trips"}
                className='text-slate-900 hover:text-sky-500'
              >
                My Trips
              </Link>
              <Link
                href={"/globe"}
                className='text-slate-900 hover:text-sky-500'
              >
                Globe
              </Link>
              <button
                className='flex items-center justify-center text-white bg-gray-800 hover:bg-gray-900 p-2 rounded-sm cursor-pointer'
                onClick={() => logout()}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                className='flex items-center justify-center text-white bg-red-600 hover:bg-red-700 p-2 rounded-sm cursor-pointer'
                onClick={() => loginWithGoogle()}
              >
                Sign In with Google
              </button>
              <button
                className='flex items-center justify-center text-white bg-gray-800 hover:bg-gray-900 p-2 rounded-sm cursor-pointer'
                onClick={() => loginWithGitHub()}
              >
                Sign In with GitHub
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
