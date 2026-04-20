import Image from "next/image";
import Link from "next/link";
import { Star, ArrowLeft } from "lucide-react";
import { getPriceLabel } from "../lib";

interface HeroSectionProps {
  name: string;
  imageUrl: string | null;
  rating: number;
  reviewCount: number;
  priceRange: number;
  cuisineName?: string;
  cuisineId?: string;
}

export function HeroSection({
  name,
  imageUrl,
  rating,
  reviewCount,
  priceRange,
  cuisineName,
  cuisineId,
}: HeroSectionProps) {
  const priceLabel = getPriceLabel(priceRange);

  return (
    <div className="relative h-80 md:h-96">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
          priority
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-orange-200 to-red-200" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/restaurants"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Restaurants
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
            {name}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-white/90">
            {cuisineName && cuisineId && (
              <Link
                href={`/cuisines/${cuisineId}`}
                className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full hover:bg-white/30 transition-colors"
              >
                {cuisineName}
              </Link>
            )}
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="font-semibold">{rating.toFixed(1)}</span>
              <span>({reviewCount} reviews)</span>
            </div>
            <span className="font-semibold">{priceLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
