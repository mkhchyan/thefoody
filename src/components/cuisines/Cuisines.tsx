import Link from "next/link";
import { cuisines } from "./data";

function Cuisines() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Cuisines
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From Italian pasta to Japanese sushi, discover restaurants serving
            your favorite cuisines
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {cuisines.map((cuisine) => (
            <Link
              key={cuisine.name}
              href={"/restaurants?cuisine=" + cuisine.slug}
              className="group flex flex-col items-center p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300"
            >
              <div
                className={
                  "w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform " +
                  cuisine.color
                }
              >
                <cuisine.icon className="w-8 h-8" />
              </div>
              <span className="font-semibold text-gray-800">
                {cuisine.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Cuisines;
