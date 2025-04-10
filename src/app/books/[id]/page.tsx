'use client'
import React, { use, useEffect, useState } from 'react'
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react"
import { Book } from '@/types/Book';
import { set } from 'zod';
import AddToShelf from '@/components/AddToShelf';
import { getIsLoggedIn } from '@/hooks/auth';

const page = () => {
  const params = useParams<{ tag: string; item: string }>()

  
  const [loggedIn, setLoggedIn] = useState(false)
  const [sessionLoading, setSessionLoading] = useState(true)
  const [bookDeatails, setBookDetails] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const { data: session, status } = useSession()


  useEffect(() => {
    setLoggedIn(getIsLoggedIn(status))
    setSessionLoading(false)
  }, [session])

  useEffect(() => {
    const fetchBookDetails = async () => {
      const res = await fetch(`https://openlibrary.org/works/${params.id}.json`)
      if (!res.ok) {
        setError('Failed to fetch book details')
        setIsLoading(false)
        return
      }
      const data = await res.json()
      console.log(data)
      setBookDetails(data)
      setIsLoading(false)
    }
    fetchBookDetails()
  }, []) 
  
  return (
    <div>
      <h1>Book details</h1>
    {
      sessionLoading ? (
        <p>Loading...</p>
      ) : (loggedIn && <AddToShelf />)
    }
    </div>
  )
}

export default page