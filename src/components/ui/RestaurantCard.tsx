import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Clock } from "lucide-react";

interface RestaurantCardProps {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  rating: number;
  reviewCount: number;
  city: string;
  priceRange: number;
  cuisineName?: string | null;
  openingTime?: string | null;
  closingTime?: string | null;
}

export function RestaurantCard({
  id,
  name,
  description,
  imageUrl,
  rating,
  reviewCount,
  city,
  priceRange,
  cuisineName,
  openingTime,
  closingTime,
}: RestaurantCardProps) {
  return (
    <Link
      href={`/restaurants/${id}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
            <span className="text-4xl">🍽️</span>
          </div>
        )}
        {cuisineName && (
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
            {cuisineName}
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
            {name}
          </h3>
          <span className="text-orange-600 font-semibold">
            {"$".repeat(priceRange)}
          </span>
        </div>
        {description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {description}
          </p>
        )}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-medium text-gray-700">{rating.toFixed(1)}</span>
            <span>({reviewCount})</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{city}</span>
          </div>
        </div>
        {openingTime && closingTime && (
          <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>
              {openingTime} - {closingTime}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
