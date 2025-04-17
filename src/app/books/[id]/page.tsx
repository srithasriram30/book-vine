/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, {  useEffect, useState } from 'react'
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react"
import AddToShelf from '@/components/book/AddToShelf';
import { getIsLoggedIn } from '@/hooks/auth';
import { getAuthorName, getBookDetails } from '@/hooks/book';
import { getAuthorId } from '@/lib/utils';
import ReviewCard from '@/components/review/ReviewCard';
import StartReading from '@/components/book/StartReading';
import Link from 'next/link';
import { getReviewByBookId } from '@/app/api/review/route';

const Page = () => {

/*
  TODO:
  - Add a loading spinner
  - Add a button to add book to shelf
  - Add a button to change the status of book (read, currently reading, want to read)
  - Add a button to remove book from shelf (if already in shelf)
  - Add a link to author page
  - Add a create/edit review button
*/
  const params = useParams<{ tag: string; item: string }>()

  
  const [loggedIn, setLoggedIn] = useState(false)
  const [sessionLoading, setSessionLoading] = useState(true)
  const [bookDeatails, setBookDetails] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const { data: session, status } = useSession()
  const [authorName, setAuthorName] = useState('')
  const [reviewList, setReviewList] = useState([]);

  console.log(session)


  useEffect(() =>{
    const getReviews = async () => {
      try {
        const reviewList = await getReviewByBookId(params.id)

        if(reviewList.success){
          setReviewList(reviewList);
          console.log(reviewList)
        }
      } 

       catch (error) {
        console.log('Error fetching reviews' + error)
      }
    }

    getReviews()
  }, [])



  useEffect(() => {
    setLoggedIn(getIsLoggedIn(status))
    setSessionLoading(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const book = await getBookDetails(params.id)
        console.log(book)
        if (!book.success) {
          setError(book.error)
          return
        }
        const authorId = getAuthorId(book.book.authors[0].author.key)
        const author = await getAuthorName(authorId)
        if (!author.success) {
          setError(author.error)
          return
        }
        setAuthorName(author.author.name)
        setBookDetails(book.book)
      } catch (error) {
        console.log(error)
        setError('Failed to fetch book details')
        setError(error.message)
      } finally{
        setIsLoading(false)
      }
    }
    fetchBookDetails()
  }, []) 
  
  return (
    <div>
      {
        isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className='mx-5'>
            <h1 className='text-4xl text-center my-4'>{bookDeatails.title}</h1>
            
            <div className='flex flex-row items-center gap-5'>
              <div>
              <img 
                src={`https://covers.openlibrary.org/b/id/${bookDeatails.covers[0]}-L.jpg`}
                alt={bookDeatails.title}
                width={400}
                height={400}/> 

                <div>
                  {authorName}
                </div>
                    {
      sessionLoading ? (
        <p>Loading...</p>
      ) : (loggedIn && 
      <div className='flex flex-col gap-3'>
      <AddToShelf />
      <StartReading />
      <Link href={`/books/${params.id}/addReview`}>Add Review</Link>
      </div>)
    }
                </div>
                <p>{bookDeatails.description}</p>
            </div>
            
           
           <div className='border-t-2 border-gray-300 pt-3 mt-5'>
            <h2 className='text-2xl text-center'>Reviews</h2>
            {
              reviewList.reviews.length === 0 ? (
                <p>No reviews yet</p>
              ) : (
                reviewList.reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))
              )
              
            }
           </div>
          </div>
          
        )
      }

    </div>
  )
}

export default Page