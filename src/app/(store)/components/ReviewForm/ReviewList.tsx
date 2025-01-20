import { ReviewItem } from "./ReviewItem";
import { Review } from '../../../../../sanity.types';

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  return (
    <div>
      {reviews.map((review) => (
        <ReviewItem key={review._id} review={review} />
      ))}
    </div>
  );
}

