import { Star } from 'lucide-react'
import { Review } from './ReviewSection'

interface ReviewItemProps {
  review: Review
}

export function ReviewItem({ review }: ReviewItemProps) {
  return (
    <div className="border-b border-gray-200 py-4">
      <div className="flex items-center mb-2">
        <span className="font-semibold mr-2">{review.username}</span>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-500 ml-2">{review.date}</span>
      </div>
      <p className="text-gray-700">{review.comment}</p>
    </div>
  )
}

