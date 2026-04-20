import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRestaurantDetail, generateRestaurantMetadata } from "./lib";
import { HeroSection, ReviewsSection, Sidebar } from "./_components";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return generateRestaurantMetadata(id);
}

export default async function RestaurantPage({ params }: Props) {
  const { id } = await params;
  const restaurant = await getRestaurantDetail(id);

  if (!restaurant) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <HeroSection
        name={restaurant.name}
        imageUrl={restaurant.imageUrl}
        rating={restaurant.rating}
        reviewCount={restaurant._count.reviews}
        priceRange={restaurant.priceRange}
        cuisineName={restaurant.cuisine?.name}
        cuisineId={restaurant.cuisine?.id}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed">
                {restaurant.description || "No description available."}
              </p>
            </section>

            <ReviewsSection
              reviews={restaurant.reviews}
              reviewCount={restaurant._count.reviews}
            />
          </div>

          <Sidebar
            address={restaurant.address}
            city={restaurant.city}
            phone={restaurant.phone}
            email={restaurant.email}
            openingTime={restaurant.openingTime}
            closingTime={restaurant.closingTime}
            tables={restaurant.tables}
          />
        </div>
      </div>
    </div>
  );
}
