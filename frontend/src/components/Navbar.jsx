import { Link } from "react-router-dom";
import { Leaf, ShoppingCart } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo Section */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="bg-green-600 p-2 rounded-xl">
            <Leaf className="h-5 w-5 text-white" />
          </div>

          <span className="font-bold text-xl">
            Krishi<span className="text-green-600">Sathi</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="hover:text-green-600 transition-colors">
            Home
          </Link>

          <Link to="/products" className="hover:text-green-600 transition-colors">
            Products
          </Link>

          {/* 1. Added Detect Disease here */}
          <Link to="/detect" className="hover:text-green-600 transition-colors">
            Detect Disease
          </Link>

          <Link to="/orders" className="hover:text-green-600 transition-colors">
            Orders
          </Link>

          <Link to="/cart" className="hover:text-green-600 transition-colors">
            <ShoppingCart className="h-5 w-5" />
          </Link>
          
          {/* Authentication State Controls */}
          {user ? (
            <>
              <span className="text-gray-700 font-medium">{user.name}</span>

              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;