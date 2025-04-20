'use server'
import db from "@/lib/db/db"
import { Review } from "@/types/Review";

export const getReviewByBookId = async (bookId:string) => {
    try {
        const reviews = await db.review.findMany({
            where: {
                bookId: bookId
            }
        })

        if (!reviews) {
            return {error: 'No reviews found', success: false, reviews: null} 
        }

        if( reviews.length === 0) {
            return {error: 'No reviews available', success: true, reviews: []} 
        }

        return {error: null, success: true, reviews: reviews}
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return {error: 'Error fetching reviews', success: false, reviews: null} 
    }
}

export const addReview = async (review: Review) => {
    try {
        const newReview = await db.review.create({
            data: {
                bookId: review.bookId,
                userEmail: review.userEmail,
                rating: review.rating,
                review: review.review,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })

        if(!newReview) {
            return {error: 'Error adding review', success: false} 
        }
        return {error: null, success: true, review: newReview}
    } catch (error) {
        console.error("Error adding review:", error);
        return {error: 'Error adding review', success: false} 
    }
}

export const editReview = async (review: Review) => {
    try {
        const editReview = await db.review.update({
            where: {
                id: review.id
            },
            data: {
                bookId: review.bookId,
                userEmail: review.userEmail,
                rating: review.rating,
                review: review.review,
                updatedAt: new Date()
            }
        });

        if(!editReview) {
            return {error: 'Error adding review', success: false} 
        }

        return {error: null, success: true, review: editReview}
    } catch (error) {
        console.error("Error adding review:", error);
        return {error: 'Error adding review', success: false} 
    }
}

export const getReviewByUserEmail = async (userEmail:string) => {
    // This is used to get the latest reviews of a user for the dahboard
    try {
        const reviews = await db.review.findMany({
            where: {
                userEmail: userEmail
            }, 
            orderBy: {
                createdAt: 'desc'
            }, take: 10
                })

        if (!reviews) {
            return {error: 'No reviews found', success: false, reviews: null} 
        }

        if( reviews.length === 0) {
            return {error: 'No reviews available', success: true, reviews: []} 
        }

        return {error: null, success: true, reviews: reviews}
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return {error: 'Error fetching reviews', success: false, reviews: null} 
    }
}

export const deleteReviewById = async (reviewId: string) => {
    try {
        const deletedReview = await db.review.delete({
            where: {
                id: reviewId
            }
        })
        if(!deletedReview) {
            return {error: 'Error deleting review', success: false}
        }

        return {error: null, success: true, review: deletedReview}
    } catch (error) {
        console.log("Error deleting review:", error);
        return {error: 'Error deleting review', success: false}
    }
}

export const getReviewById = async (reviewId:string) => {
    try {
        const review = await db.review.findUnique({
            where: {
                id: reviewId
            }
        })

        if(!review){
            console.error("Error fetching review:", error);
            return {error: 'Error fetching review', success: false, reviews: null} 
    
        }

        return {error: '', success: true, review: review}
    } catch (error) {
        console.error("Error fetching review:", error);
        return {error: 'Error fetching review', success: false, reviews: null} 

    }
}