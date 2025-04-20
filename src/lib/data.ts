import { Review } from "@/types/Review";

interface ReviewList extends Array<Review> {
  reviews: Review[];
}



export const reviews: ReviewList = [
    {
        "id": "65f8a1b2c3d4e5f6a7b8c9d0",
        "bookId": "OL66513W",
        "userId": "0ab7ab1d-e685-4dba-b426-c9e8a3a41e5b",
        "rating": 5,
        "review": "This book completely changed my perspective on life. The author's insights are profound and beautifully written. I couldn't put it down!",
        "createdAt": new Date("2023-03-15T10:30:00Z"),
        "updatedAt": new Date("2023-03-15T10:30:00Z")
      },
      {
        "id": "76g9b2c3d4e5f6g7h8i9j0k",
        "bookId": "OL66513W",
        "userId": "0ab7ab1d-e685-4dba-b426-c9e8a3a41e5b",
        "rating": 4,
        "review": "A captivating read with well-developed characters. The plot kept me engaged, though the ending felt slightly rushed. Still highly recommend!",
        "createdAt": new Date("2023-04-22T14:45:00Z"),
        "updatedAt": new Date("2023-04-25T09:15:00Z")
      },
]