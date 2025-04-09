import { auth } from '@/lib/auth';
import Link from 'next/link'
import React from 'react'
import { SignOut } from './sign-out';

const Navbar = async () => {
    const session = await auth();
    console.log(session)
  
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