import { ReviewCard } from "@/components/ui";

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  user: {
    name: string | null;
    image: string | null;
  };
}

interface ReviewsSectionProps {
  reviews: Review[];
  reviewCount: number;
}

export function ReviewsSection({ reviews, reviewCount }: ReviewsSectionProps) {
  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Reviews ({reviewCount})
      </h2>
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              id={review.id}
              rating={review.rating}
              comment={review.comment}
              createdAt={review.createdAt}
              user={review.user}
            />
          ))}
        </div>
      )}
    </section>
  );
}
