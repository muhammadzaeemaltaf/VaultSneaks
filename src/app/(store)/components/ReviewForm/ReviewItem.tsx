import { Star } from 'lucide-react';
import { Review } from '../../../../../sanity.types';

interface ReviewItemProps {
  review: Review;
}

export function ReviewItem({ review }: ReviewItemProps) {
  return (
    <div className="border-b border-gray-200 py-4">
      <div className="flex items-center mb-2">
        <span className="font-semibold mr-2">{review.reviewerName}</span>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= (review.rating ?? 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-500 ml-2">{new Date(review.reviewDate ?? '').toDateString()}</span>
      </div>
      <p className="text-gray-700">{review.reviewText}</p>
    </div>
  );
}

