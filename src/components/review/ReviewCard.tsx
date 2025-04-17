'use client'
import { getUsername } from '@/app/api/users/route'
import { Review } from '@/types/Review'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { FaPenToSquare, FaTrashCan } from "react-icons/fa6";
interface ReviewCardProps {
  review: Review
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {

  const [username, setUsername] = React.useState<string>('')
  const { data: session } = useSession()

  useEffect(() => { 
    const fetchUsername = async () => {
      const { success, username } = await getUsername(review.userEmail)
      if (success && username) {
        setUsername(username)
      }
    }
    

    fetchUsername()
  }, [])

  console.log("ReviewCard username:", username)
  return (
    <div className='flex flex-row items-center my-5 gap-5 p-4 border rounded-lg shadow-sm'>
      <div>
        {session?.user?.email === review.userEmail && 
        <div><span><FaPenToSquare /></span>   
        <span><FaTrashCan /></span></div>}
      </div>
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