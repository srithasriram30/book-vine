import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {

    const session = await auth();

    if(!session){
        redirect('/login')
    }

    console.log(session)

  return (
    <div>Dashboard</div>
  )
}

export default page