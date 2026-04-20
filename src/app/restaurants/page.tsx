import { Metadata } from "next";
import { RestaurantCard, FilterSidebar, EmptyState } from "@/components/ui";
import { getRestaurantsPageData, type SearchParams } from "./lib";

export const metadata: Metadata = {
  title: "Restaurants - TheFoody",
  description: "Discover the best restaurants near you",
};

export default async function RestaurantsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { restaurants, cuisineFilters, cityFilters, pageTitle } =
    await getRestaurantsPageData(params);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {pageTitle}
          </h1>
          <p className="text-gray-600">
            {restaurants.length} restaurant{restaurants.length !== 1 && "s"}{" "}
            found
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar
            filters={[
              {
                title: "Cuisine",
                options: cuisineFilters,
                activeValue: params.cuisine,
                allLabel: "All Cuisines",
                allHref: "/restaurants",
              },
              {
                title: "City",
                options: cityFilters,
                activeValue: params.city,
                allLabel: "All Cities",
                allHref: params.cuisine
                  ? `/restaurants?cuisine=${params.cuisine}`
                  : "/restaurants",
              },
            ]}
          />

          <div className="flex-1">
            {restaurants.length === 0 ? (
              <EmptyState
                message="No restaurants found"
                actionLabel="Clear filters"
                actionHref="/restaurants"
              />
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {restaurants.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    id={restaurant.id}
                    name={restaurant.name}
                    description={restaurant.description}
                    imageUrl={restaurant.imageUrl || ""}
                    rating={restaurant.rating}
                    reviewCount={restaurant._count.reviews}
                    city={restaurant.city}
                    priceRange={restaurant.priceRange || 0}
                    cuisineName={restaurant.cuisine?.name}
                    openingTime={restaurant.openingTime}
                    closingTime={restaurant.closingTime}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
