import { urlFor } from "@/sanity/lib/image";
import { Review } from "../../../../../sanity.types";
import Image from "next/image";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Star } from "lucide-react";

interface ReviewItemProps {
  review: Review;
}

export function ReviewItem({ review }: ReviewItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openCarousel = (index: number) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
  };

  const closeCarousel = () => {
    setIsOpen(false);
  };

  return (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <div className="flex items-center flex-wrap gap-2">
        <h3 className="text-lg font-bold">{review.reviewerName}</h3>
        <p className="text-sm text-gray-600">
          {new Date(review.reviewDate ?? 0).toDateString()}
        </p>
      </div>
      <div className="flex items-center mt-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= (review.rating ?? 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
      <p className="mt-2">{review.reviewText}</p>
      <div className="flex flex-wrap gap-2 w-fit relative">
        {review.reviewPicture &&
          review.reviewPicture.length > 0 &&
          review.reviewPicture
        .slice(0, 3)
        .map((picture, index) => (
          <Image
            key={index}
            src={urlFor(picture).url()}
            alt={`Review Picture ${index + 1}`}
            height={1000}
            width={1000}
            className="mt-4 h-20 w-20 cursor-pointer"
            onClick={() => openCarousel(index)}
          />
        ))}
        {review.reviewPicture && review.reviewPicture.length > 3 && (
          <button
        className="mt-4 h-20 w-20 flex items-center justify-center bg-black/40 text-white text-xs line-clamp-2 absolute bottom-0 right-0"
        onClick={() => openCarousel(0)}
          >
        View all images
          </button>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <div className="relative w-full max-w-xs sm:max-w-full md:max-w-3xl bg-white p-4 rounded">
            <div className="flex items-center flex-wrap gap-2">
              <h3 className="text-lg font-bold">{review.reviewerName}</h3>
              <p className="text-sm text-gray-600">
                {new Date(review.reviewDate ?? 0).toDateString()}
              </p>
            </div>
            <div className="flex items-center mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${star <= (review.rating ?? 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <p className="mt-2">{review.reviewText}</p>
            <hr className="my-5" />
            <Carousel className="w-full max-w-xs mx-auto"
             opts={{
              align: "start",
              loop: true,
            }}
            >
              <CarouselContent>
                {review.reviewPicture &&
                  review.reviewPicture.map((picture, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1 h-56 w-56 mx-auto">
                        <Image
                          src={urlFor(picture).url()}
                          alt={`Review Picture ${index + 1}`}
                          height={1000}
                          width={1000}
                          className="object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:block"/>
              <CarouselNext className="hidden md:block"/>
            </Carousel>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
