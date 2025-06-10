import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Review } from "../../../../../sanity.types";
import { useUserStore } from "../../../../../store";
import Link from "next/link";

interface ReviewFormProps {
  onSubmit: (review: Review, pictures: File[], video: File | null) => void;
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [pictures, setPictures] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user) {
      setUsername(`${user.firstName} ${user.lastName}`);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username && rating && comment) {
      setIsSubmitting(true);
      await onSubmit(
        {
          _type: "review",
          reviewerName: username,
          rating,
          reviewText: comment,
          reviewDate: new Date().toISOString(),
          _id: "",
          _createdAt: "",
          _updatedAt: "",
          _rev: "",
        },
        pictures,
        video
      );
      setUsername("");
      setRating(0);
      setComment("");
      setPictures([]);
      setVideo(null);
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {user ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Your Name
            </label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rating
            </label>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 cursor-pointer ${
                    star <= rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700"
            >
              Your Review
            </label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review here"
              required
            />
          </div>
          <div>
            <label
              htmlFor="pictures"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Pictures
            </label>
            <Input
              id="pictures"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) =>
                setPictures(e.target.files ? Array.from(e.target.files) : [])
              }
            />
          </div>
          {!user.isActive ? (
            <Button type="submit" disabled>
              Activate your account to submit a review 
          </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          )}
        </form>
      ) : (
        <>
          <p className="font-bold text-lg">Please login to submit a review</p>
          <Button className="px-8 py-3 mt-4 rounded-3xl">
            <Link href="/login">Login</Link>
          </Button>
        </>
      )}
    </div>
  );
}
