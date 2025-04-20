'use client'
import { editReview, getReviewById } from '@/app/api/review/route';
import { Input } from '@/components/ui/input';
import { Review } from '@/types/Review';
import { useSession } from 'next-auth/react';
import { redirect, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {

  const [reviewDetails, setReviewDetails] = useState<Review>();
  const [isLoading, setIsLoading ] = useState(true)
  const [error, setError] = useState('')
  const params = useParams<{ tag: string; item: string }>()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
   const { data: session } = useSession();
  const email = session?.user?.email;


        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setIsSubmitting(true);
        setError('');
        setSuccess(false);


        const formData = new FormData(e.currentTarget);
        const rating = formData.get('rating');
        const reviewText = formData.get('review');
        const reviewData: Review = {
                    id: params.reviewId,
                    bookId: params.id,
                    userEmail: email,
                    rating: parseInt(rating),
                    review: reviewText
        }
                    try {
                      const response = await editReview(reviewData)
                      console.log(response)
                      
                                  if(response.success){
                                      setSuccess(true);
                                  
                                  } else {
                                      setSuccess(false)
                                  }
                    } catch (error) {
                      console.log(`error adding review: ${error}`)
                      setSuccess(false)
                      setIsLoading(false)
                    } finally {
                      redirect(`/books/${params.id}`)
                    }
        
                
          
        }

  useEffect(() => {
    const getReview = async() => {
    try {
      
        const review = await getReviewById(params.reviewId)
        if(!review.success){
          setError(review.error)
        }
        setReviewDetails(review.review)
      }

     catch (error) {
      console.log(`error getting data: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }
    getReview()
  }, [])
  return (
    <div>

      {
        isLoading ? (
          <p>Loading...</p>
        ) : (
          <form className='mx-4' onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
                    <label htmlFor='rating'>Rating</label>
                    <Input 
                        type='number' 
                        id='rating' 
                        name='rating' 
                        min='1' 
                        max='5' 
                        required 
                        defaultValue={reviewDetails.rating}
                        disabled={isSubmitting}
                    />
                </div>

                <div className="grid gap-4 py-4">
                    <label htmlFor='review'>Review</label>
                    <textarea 
                        id='review' 
                        name='review' 
                        required 
                        defaultValue={reviewDetails.review}
                        disabled={isSubmitting}
                        className="p-2 border rounded min-h-[100px]"
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
      </form>
        )
      }
      

      
    </div>
  )
}

export default page