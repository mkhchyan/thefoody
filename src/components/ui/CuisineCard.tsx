import Image from "next/image";
import Link from "next/link";

interface Restaurant {
  id: string;
  name: string;
  imageUrl: string | null;
}

interface CuisineCardProps {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  restaurantCount: number;
  topRestaurants: Restaurant[];
}

export function CuisineCard({
  id,
  name,
  description,
  imageUrl,
  restaurantCount,
  topRestaurants,
}: CuisineCardProps) {
  return (
    <Link
      href={`/cuisines/${id}`}
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
            <span className="text-5xl">🍴</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-2xl font-bold text-white mb-1">{name}</h2>
          <p className="text-white/80 text-sm">
            {restaurantCount} restaurant{restaurantCount !== 1 && "s"}
          </p>
        </div>
      </div>
      <div className="p-5">
        {description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        )}
        {topRestaurants.length > 0 && (
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
              Top Restaurants
            </p>
            <div className="flex -space-x-2">
              {topRestaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
                  title={restaurant.name}
                >
                  {restaurant.imageUrl ? (
                    <Image
                      src={restaurant.imageUrl}
                      alt={restaurant.name}
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-orange-100 flex items-center justify-center text-xs">
                      {restaurant.name.charAt(0)}
                    </div>
                  )}
                </div>
              ))}
              {restaurantCount > 3 && (
                <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs text-gray-600 font-medium">
                  +{restaurantCount - 3}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
