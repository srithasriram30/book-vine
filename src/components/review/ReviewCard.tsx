'use client'
import { getUsername } from '@/app/api/users/route'
import { Review } from '@/types/Review'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { FaPenToSquare } from "react-icons/fa6";
import { Button } from '../ui/button'
import DeleteButton from './DeleteButton'
import { redirect } from 'next/navigation'
import Link from 'next/link'
interface ReviewCardProps {
  review: Review
}
//OL471576W
const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {

  const [username, setUsername] = React.useState<string>('')
  const { data: session } = useSession()

  const handleEdit = () => {
  }



  useEffect(() => { 
    const fetchUsername = async () => {
      const { success, username } = await getUsername(review.userEmail)
      if (success && username) {
        setUsername(username)
      }
    }
    
    fetchUsername()
  }, [])

  return (
    <div className='flex flex-col my-5 gap-3 p-4 border rounded-lg shadow-sm'>
      <div className='flex justify-between items-center'>
        <p className='font-medium'>{username}</p>
        {session?.user?.email === review.userEmail && 
        <div className='flex flex-row gap-2'>
          <Link href={`/books/${review.bookId}/editReview/${review.id}`}>
          <Button className='bg-yellow-400 hover:bg-yellow-500' onClick={handleEdit} size="sm" variant="ghost"> 
            
            <FaPenToSquare className="mr-1" /> Edit
            
          </Button>
          </Link>
          <DeleteButton reviewId={review.id} />
        </div>}
      </div>
      <div>
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

