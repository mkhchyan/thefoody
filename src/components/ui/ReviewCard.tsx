import Image from "next/image";
import { Star } from "lucide-react";

interface ReviewCardProps {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  user: {
    name: string | null;
    image: string | null;
  };
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function ReviewCard({ rating, comment, createdAt, user }: ReviewCardProps) {
  const initial = user.name?.charAt(0).toUpperCase() ?? "U";

  return (
    <div className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name ?? "User"}
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <span className="text-orange-600 font-semibold">{initial}</span>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-gray-900">
              {user.name ?? "Anonymous"}
            </span>
            <span className="text-sm text-gray-500">{formatDate(createdAt)}</span>
          </div>
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          {comment && <p className="text-gray-600">{comment}</p>}
        </div>
      </div>
    </div>
  );
}
