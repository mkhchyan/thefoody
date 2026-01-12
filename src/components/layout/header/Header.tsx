import Link from "next/link";
import Logo from "./Logo";

function Header() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="text-2xl font-bold bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              TheFoody
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/restaurants"
              className="text-gray-600 hover:text-orange-600 transition-colors font-medium"
            >
              Restaurants
            </Link>
            <Link
              href="/cuisines"
              className="text-gray-600 hover:text-orange-600 transition-colors font-medium"
            >
              Cuisines
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-orange-600 transition-colors font-medium"
            >
              About
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="bg-linear-to-r from-orange-500 to-red-600 text-white px-5 py-2.5 rounded-full font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
