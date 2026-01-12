import { MapPin, Search } from "lucide-react";
import React from "react";

function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-orange-50 via-white to-red-50" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-6">
            Discover & Book
            <span className="block bg-linear-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              Amazing Restaurants
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Find the perfect spot for any occasion. Browse menus, read reviews,
            and reserve your table in seconds.
          </p>
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-3 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search restaurants, cuisines, or dishes..."
                  className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                />
              </div>
              <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl md:w-48">
                <MapPin className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location"
                  className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                />
              </div>
              <button className="bg-linear-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300">
                Search
              </button>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">10K+</div>
              <div className="text-gray-500">Restaurants</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">50K+</div>
              <div className="text-gray-500">Happy Diners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">100+</div>
              <div className="text-gray-500">Cities</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
