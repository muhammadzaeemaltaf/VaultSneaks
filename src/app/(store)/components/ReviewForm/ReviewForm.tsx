import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Review } from '../../../../../sanity.types';

interface ReviewFormProps {
  onSubmit: (review: Review) => void;
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [username, setUsername] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && rating && comment) {
      onSubmit({ 
        _type: "review",
        reviewerName: username, 
        rating, 
        reviewText: comment, 
        reviewDate: new Date().toISOString(),
        _id: '',
        _createdAt: '',
        _updatedAt: '',
        _rev: ''
      });
      setUsername('');
      setRating(0);
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Your Name</label>
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
        <label className="block text-sm font-medium text-gray-700">Rating</label>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-6 h-6 cursor-pointer ${
                star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Your Review</label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review here"
          required
        />
      </div>
      <Button type="submit">Submit Review</Button>
    </form>
  );
}

