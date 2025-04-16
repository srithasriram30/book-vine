'use client'
import { getUsername } from '@/app/api/users/route'
import { Review } from '@/types/Review'
import React, { useEffect } from 'react'

interface ReviewCardProps {
  review: Review
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {

  const [username, setUsername] = React.useState<string>('')

  useEffect(() => { 
    const fetchUsername = async () => {
      const { success, username } = await getUsername(review.userId)
      if (success && username) {
        setUsername(username)
      }
    }

    fetchUsername()
  }, [])

  console.log("ReviewCard username:", username)
  return (
    <div className='flex flex-row items-center my-5 gap-5 p-4 border rounded-lg shadow-sm'>
      <div className='flex-shrink-0'>
        <p className='font-medium'>{username}</p>
      </div>
      <div className='flex-grow'>
        <div className='flex items-center mb-2'>
          <span className='font-bold mr-2'>Rating:</span>
          {review.rating}
        </div>
        <div className='mb-2'>
          {review.review} 
        </div>
        <div className='text-sm text-gray-500'>
          Last Updated: {new Date(review.updatedAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  )
}

export default ReviewCard