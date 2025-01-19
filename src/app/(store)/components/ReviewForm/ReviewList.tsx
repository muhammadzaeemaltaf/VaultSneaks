import { Review } from './ReviewSection'
import { ReviewItem } from './ReviewItem'

interface ReviewListProps {
  reviews: Review[]
}

export function ReviewList({ reviews }: ReviewListProps) {
  return (
    <div className="space-y-4">
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet. Be the first to leave a review!</p>
      ) : (
        reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))
      )}
    </div>
  )
}

