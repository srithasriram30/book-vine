import  client  from "@/lib/db/db"
import { Review } from "@/types/Review"

export const getReviewsByBookId = async (bookId: string) => {
    try {
        const reviews = await client.review.findMany({
            where: {
                bookId: bookId,
            },
            orderBy: {
                updatedAt: 'desc',
            }
        })

        return {reviews: reviews, error: null, success: true}
    } catch (error) {
        console.error("Error fetching reviews:", error)
        return {reviews: [], error: "Failed to fetch reviews", success: false}
        
    }
}

export const createReview = async (bookId: string, userId:string, review: Review) => {
    try {
        const newReview = await client.review.create({
            
            data: {
                bookId,
                userId,
                rating: review.rating,
                review: review.review,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        })

        if(newReview){
            return {error: '', success: true}
        } else {
            return {error: "Failed to create review", success: false}

        }
    } catch (error) {
        console.log("Error creating review:", error)
        return {error: "Failed to create review", success: false}
    }
}