import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CuisineCard, EmptyState } from "@/components/ui";

export default async function CuisinesPage() {
  const cuisines = await prisma.cuisine.findMany({
    include: {
      _count: {
        select: { restaurants: true },
      },
      restaurants: {
        where: { isActive: true },
        take: 3,
        select: {
          id: true,
          name: true,
          imageUrl: true,
          rating: true,
        },
        orderBy: { rating: "desc" },
      },
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Cuisines
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover restaurants serving your favorite cuisines from around the
            world
          </p>
        </div>

        {cuisines.length === 0 ? (
          <EmptyState message="No cuisines found" />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cuisines.map((cuisine) => (
              <CuisineCard
                key={cuisine.id}
                id={cuisine.id}
                name={cuisine.name}
                description={cuisine.description}
                imageUrl={cuisine.imageUrl}
                restaurantCount={cuisine._count.restaurants}
                topRestaurants={cuisine.restaurants}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Cuisines - TheFoody",
  description: "Explore restaurants by cuisine type",
};
