import { auth } from '@/lib/auth';
import Link from 'next/link'
import React from 'react'
import { SignOut } from './sign-out';
import { FaUser } from "react-icons/fa6";

const Navbar = async () => {
    const session = await auth();
  
  return (
    <nav>
        <Link href='/'>Bookvine</Link>
        <div className='flex gap-5'>
          {
            !session ? (
              <>
                <Link href='/login'>Login</Link>
                <Link href='/register'>Register</Link>
              </>
            ) : (
              <>
                <FaUser />
                <Link href='/dashboard'>Dashboard</Link>
                <SignOut />
              </>
            )
          }
          
        </div>
        
    </nav>
  )
}

export default Navbar