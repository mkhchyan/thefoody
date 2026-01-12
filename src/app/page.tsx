import { Search, Clock, Users } from "lucide-react";
import Hero from "@/components/hero/Hero";
import Features from "@/components/features/Features";
import Cuisines from "@/components/cuisines/Cuisines";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Cuisines />
      <Features />
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Book your perfect dining experience in three simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Discover</h3>
              <p className="text-gray-600">
                Search restaurants by cuisine, location, or dish. Read reviews
                and explore menus.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Choose Time
              </h3>
              <p className="text-gray-600">
                Select your preferred date, time, and party size for your
                reservation.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Book & Enjoy
              </h3>
              <p className="text-gray-600">
                Confirm your booking instantly and get ready for an amazing
                dining experience.
              </p>
            </div>
          </div>
        </div>
      </section>
      <CTASection />
    </div>
  );
}
