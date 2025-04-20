import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { FaTrashCan } from 'react-icons/fa6'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { deleteReviewById } from '@/app/api/review/route'
  

const DeleteButton = (reviewId) => {
    const handleDelete = async () => {
        try {
          //console.log(reviewId.reviewId)

 
              const deleted = await deleteReviewById(reviewId.reviewId);

              console.log(deleted)
              if(!deleted) {
                return {error: 'error in deleting review', success: false}
              }
              return {error: '', success: true}
              
        } catch (error) {
          console.log('error deleting review' +error)
        } 
      }
  return (
    <div>
        <AlertDialog>
        <AlertDialogTrigger>
            <Button className='bg-red-500 text-white hover:bg-red-600'  size="sm" variant="ghost">
            <FaTrashCan className="mr-1" /> Delete
          </Button>
        </AlertDialogTrigger>
      
        <AlertDialogContent>
         <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this review?</AlertDialogTitle>
            <AlertDialogDescription>
            This action cannot be undone. 
      </AlertDialogDescription>
         </AlertDialogHeader>
         <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
    </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
        
    </div>
  )
}

export default DeleteButton