import Link from "next/link";

const CTASection = () => {
  return (
    <section className="py-20 bg-linear-to-r from-orange-500 to-red-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Ready to Find Your Next Favorite Spot?
        </h2>
        <p className="text-xl text-orange-100 mb-10">
          Join thousands of food lovers who trust TheFoody for their dining
          adventures.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="bg-white text-orange-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300"
          >
            Create Free Account
          </Link>
          <Link
            href="/restaurants"
            className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-orange-600 transition-all duration-300"
          >
            Browse Restaurants
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
