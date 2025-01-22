import { useState } from "react";
import { ReviewItem } from "./ReviewItem";
import { Review } from '../../../../../sanity.types';
import { Button } from "@/components/ui/button";

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  const [visibleReviews, setVisibleReviews] = useState(3);

  const showMoreReviews = () => {
    setVisibleReviews((prev) => prev + 4);
  };

  const showLessReviews = () => {
    setVisibleReviews(3);
  };

  return (
    <div>
      {reviews.slice(0, visibleReviews).map((review) => (
        <ReviewItem key={review._id} review={review} />
      ))}
      <div className="flex items-center flex-wrap gap-4">
      {reviews.length > visibleReviews && (
        <Button onClick={showMoreReviews} variant={'outline'} className="mt-4 text-gray-700 text-sm rounded-full">  
          Show More
        </Button>
      )}
      {visibleReviews > 4 && (
        <Button onClick={showLessReviews} variant={'outline'} className="mt-4 text-gray-500 text-sm rounded-full">  
          Show Less
        </Button>
      )}
      </div>
    </div>
  );
}

