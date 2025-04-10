import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {

    const session = await auth();

    if(!session){
        redirect('/login')
    }


  return (
    <div className='px-4'>
      <h1 className='text-4xl text-center'>Welcome, {session?.user?.username}</h1>
    </div>
  )
}

export default page