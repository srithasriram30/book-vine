'use client'
import React, { useState } from 'react'
import { redirect, useParams } from "next/navigation";
import { useSession } from "next-auth/react"
import { Input } from '@/components/ui/input';
import { addReview } from '@/app/api/review/route';
import { Review } from '@/types/Review';

const Page = () => {
    const params = useParams<{ tag: string; item: string }>();
    const { data: session } = useSession();
    const email = session?.user?.email;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(false);

        const formData = new FormData(e.currentTarget);
        const rating = formData.get('rating');
        const reviewText = formData.get('review');

        

        const reviewData: Review = {
            bookId: params.id,
            userEmail: email,
            rating: parseInt(rating),
            review: reviewText

        }

     

        try {
            const response = await addReview(reviewData)
            console.log(response)

            if(response.success){
                setSuccess(true);
            
            } else {
                setSuccess(false)
            }
           

            
            // Optionally reset the form here
            
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setIsSubmitting(false);
            redirect(`/books/${params.id}`)
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                    <label htmlFor='rating'>Rating</label>
                    <Input 
                        type='number' 
                        id='rating' 
                        name='rating' 
                        min='1' 
                        max='5' 
                        required 
                        disabled={isSubmitting}
                    />
                </div>
                <div className="grid gap-4 py-4">
                    <label htmlFor='review'>Review</label>
                    <textarea 
                        id='review' 
                        name='review' 
                        required 
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
                
                {error && <p className="mt-4 text-red-500">{error}</p>}
                {success && <p className="mt-4 text-green-500">Review submitted successfully!</p>}
            </form>
        </div>
    );
}

export default Page;