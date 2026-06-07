import { Link, useLocation } from "react-router-dom";
import {
  Leaf,
  ShoppingCart,
  ChevronDown,
  LayoutDashboard,
  ClipboardList,
  History,
  User,
  LogOut,
  BrainCircuit,
  ShoppingBag,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState, useRef } from "react";
import {
  useCart,
} from "../context/CartContext";
function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

    const {
  cartCount,
} = useCart();
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const dashboardRef = useRef(null);
  const profileRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const loadCartCount = async () => {
      try {
        if (!user) return;
        const data = await getCartCount();
        setCartCount(data.count);
      } catch (error) {
        console.error("Failed to load navbar cart counters:", error);
      }
    };

    loadCartCount();
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dashboardRef.current &&
        !dashboardRef.current.contains(event.target)
      ) {
        setDashboardOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo Link Brand Block */}
        <Link
          to="/"
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-2 rounded-xl shadow-md shadow-emerald-600/10 transform transition-transform duration-300 group-hover:scale-105">
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <span className="font-black text-2xl tracking-tight text-gray-900">
            Krishi
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Sathi
            </span>
          </span>
        </Link>

        {/* Navigation Controls Menu */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-gray-600">
          <Link
            to="/"
            className={`relative py-1.5 transition-colors duration-300 group ${
              isActive("/") ? "text-emerald-700" : "hover:text-gray-900"
            }`}
          >
            Home
            <span
              className={`absolute bottom-0 left-0 h-0.5 bg-emerald-600 transition-all duration-300 ${isActive("/") ? "w-full" : "w-0 group-hover:w-full"}`}
            />
          </Link>

          <Link
            to="/products"
            className={`relative py-1.5 transition-colors duration-300 group ${
              isActive("/products") ? "text-emerald-700" : "hover:text-gray-900"
            }`}
          >
            Products
            <span
              className={`absolute bottom-0 left-0 h-0.5 bg-emerald-600 transition-all duration-300 ${isActive("/products") ? "w-full" : "w-0 group-hover:w-full"}`}
            />
          </Link>

          {/* AI Disease Core Callout */}
          <Link
            to="/detect"
            className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all duration-300 shadow-sm ${
              isActive("/detect")
                ? "bg-emerald-700 text-white shadow-emerald-700/10"
                : "bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-100 hover:border-emerald-600 hover:shadow-md hover:shadow-emerald-600/10"
            }`}
          >
            <BrainCircuit className="h-4 w-4" />
            AI Disease Diagnosis
          </Link>

          {/* Dashboard Group Dropdown Menu Item */}
          {user && (
            <div ref={dashboardRef} className="relative">
              <button
                onClick={() => setDashboardOpen(!dashboardOpen)}
                className={`flex items-center gap-1 py-1.5 transition-colors focus:outline-none ${
                  dashboardOpen ||
                  isActive("/dashboard") ||
                  isActive("/orders") ||
                  isActive("/history")
                    ? "text-emerald-700"
                    : "hover:text-gray-900"
                }`}
              >
                Dashboard
                <ChevronDown
                  className={`w-4 h-4 transform transition-transform duration-300 ${dashboardOpen ? "rotate-180" : ""}`}
                />
              </button>

              {dashboardOpen && (
                <div className="absolute top-full left-0 mt-3 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl p-2 origin-top-left transition-all transform animate-in fade-in slide-in-from-top-2 duration-200">
                  <Link
                    to="/dashboard"
                    onClick={() => setDashboardOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors ${
                      isActive("/dashboard")
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4 opacity-80" />
                    Overview Center
                  </Link>

                  <Link
                    to="/orders"
                    onClick={() => setDashboardOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors ${
                      isActive("/orders")
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <ClipboardList className="w-4 h-4 opacity-80" />
                    My Order History
                  </Link>

                  <Link
                    to="/history"
                    onClick={() => setDashboardOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors ${
                      isActive("/history")
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <History className="w-4 h-4 opacity-80" />
                    AI Diagnosis Records
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Cart Icon Link */}
          {user && (
            <Link
              to="/cart"
              className={`relative p-2 rounded-xl transition-all duration-300 group ${
                isActive("/cart")
                  ? "bg-gray-50 text-emerald-700"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <ShoppingCart className="h-5 w-5 transform transition-transform duration-300 group-hover:scale-105" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-black h-5 w-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          {/* User Section Dropdown Profile Block */}
          {user ? (
            <div
              ref={profileRef}
              className="relative pl-2 border-l border-gray-200"
            >
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center focus:outline-none rounded-full transition-transform duration-300 hover:scale-102"
              >
                <img
                  src={
                    user.photo ||
                    user.picture ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=10b981&color=ffffff&bold=true`
                  }
                  alt="Profile"
                  className={`w-9 h-9 rounded-full border object-cover p-0.5 transition-all duration-300 ${
                    profileOpen
                      ? "border-emerald-500 ring-4 ring-emerald-50"
                      : "border-gray-200 hover:border-emerald-500"
                  }`}
                />
              </button>

              {profileOpen && (
                <div className="absolute top-full right-0 mt-3 w-60 bg-white border border-gray-100 rounded-2xl shadow-xl p-2 origin-top-right transition-all transform animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-3 py-2.5 border-b border-gray-50 mb-1">
                    <p className="text-sm font-bold text-gray-900 truncate mt-0.5">
                      {user.name}
                    </p>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors ${
                      isActive("/profile")
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <User className="w-4 h-4 opacity-80" />
                    Profile
                  </Link>

                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors hover:bg-rose-50 text-rose-600 font-semibold"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm transition-all duration-300 transform active:scale-95 pl-4"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
