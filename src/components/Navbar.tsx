import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav>
        <Link href='/'>Bookvine</Link>
        <div className='flex gap-5'>
          <Link href='/login'>Login</Link>
          <Link href='/register'>Register</Link>
        </div>
        
    </nav>
  )
}

export default Navbar