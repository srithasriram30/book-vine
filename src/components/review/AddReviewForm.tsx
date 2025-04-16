import React from 'react'

const AddReviewForm = () => {
  return (
    <div>
      <h1>Add Review</h1>
      <form>
        <div>
          <label htmlFor='rating'>Rating</label>
          <input type='number' id='rating' name='rating' min='1' max='5' required />
        </div>
        <div>
          <label htmlFor='review'>Review</label>
          <textarea id='review' name='review' required></textarea>
        </div>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default AddReviewForm