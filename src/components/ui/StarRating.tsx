import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  reviewCount?: number;
}

const sizeClasses = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

export function StarRating({
  rating,
  maxStars = 5,
  size = "md",
  showValue = false,
  reviewCount,
}: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxStars }).map((_, i) => (
        <Star
          key={i}
          className={`${sizeClasses[size]} ${
            i < rating
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
      {showValue && (
        <span className="font-medium text-gray-700 ml-1">
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className="text-gray-500">({reviewCount})</span>
      )}
    </div>
  );
}
