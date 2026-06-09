import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { 
  Package, 
  Plus, 
  Layers, 
  ShoppingBag, 
  TrendingUp, 
  Edit3, 
  Trash2, 
  ChevronRight, 
  BarChart3 
} from "lucide-react";
import {
  getMyProducts,
  deleteProduct,
  getSellerAnalytics,
} from "../services/sellerService.js";

function SellerDashboard() {
  const [products, setProducts] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const analyticsData = await getSellerAnalytics();
      setAnalytics(analyticsData);
      
      const data = await getMyProducts();
      setProducts(data);
    } catch (error) {
      console.error("Dashboard database pull error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
        
        {/* Top Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-6 border-b border-gray-100">
          <div>
            <h1 className="text-3xl font-black text-gray-950 tracking-tight">Seller Dashboard</h1>
            <p className="text-gray-500 text-sm font-medium mt-1">
              Manage your agricultural products, shop stock, and market analytics.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/seller/orders"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm px-5 py-3 rounded-xl transition shadow-sm"
            >
              View Orders
            </Link>
            
            <Link
              to="/seller/add-product"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-5 py-3 rounded-xl flex items-center gap-2 transition shadow-md shadow-emerald-600/10"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              Add Product
            </Link>
          </div>
        </div>

        {/* Analytics Counter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Products</p>
              <p className="text-4xl font-black text-gray-900 tracking-tight">{isLoading ? "..." : products.length}</p>
            </div>
            <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-2xl">
              <Layers className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Orders</p>
              <p className="text-4xl font-black text-gray-900 tracking-tight">
                {isLoading ? "..." : (analytics?.totalOrders || 0)}
              </p>
            </div>
            <div className="p-3.5 bg-green-50 text-green-600 rounded-2xl">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Gross Revenue</p>
              <p className="text-4xl font-black text-emerald-800 tracking-tight">
                ₹{isLoading ? "..." : (analytics?.totalRevenue || 0)}
              </p>
            </div>
            <div className="p-3.5 bg-teal-50 text-teal-600 rounded-2xl">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Bottom Split Layout: Products List vs Top Selling Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Products Grid Column Block */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 pb-4 border-b border-gray-50">
              <Package className="w-5 h-5 text-emerald-600" />
              Live Marketplace Stock
            </h2>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2].map((n) => (
                  <div key={n} className="border border-gray-50 rounded-2xl p-4 h-48 animate-pulse bg-gray-50/50" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16 max-w-sm mx-auto">
                <div className="p-4 bg-gray-50 rounded-2xl inline-block text-gray-400 mb-4">
                  <Package className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">No storefront active</h3>
                <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                  Your store catalog is completely empty. Add products to activate your seller presence.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {products.map((product) => (
                  <div key={product._id} className="group border border-gray-100 rounded-2xl p-4 flex flex-col bg-white transition duration-300 hover:shadow-xl hover:shadow-emerald-950/[0.02] hover:border-emerald-500/20">
                    <div className="w-full h-36 rounded-xl bg-gray-50 overflow-hidden relative">
                      <img
                        src={product.image || "https://imgs.search.brave.com/0R-kYbFZ8IOMwqY0VvLmSIrkGXkdjMUXbdb3o_oyE2k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hZ3Jp/cGxleGluZGlhLmNv/bS9jZG4vc2hvcC9w/cm9kdWN0cy9zeW5n/ZW50YS0yMi5wbmc_/dj0xNzQzMjQxOTUy/JndpZHRoPTIwMDA"}
                        alt={product.name}
                        className="w-full h-full object-cover transform transition duration-500 group-hover:scale-102"
                      />
                    </div>

                    <h3 className="font-bold text-gray-900 mt-3 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                      {product.name}
                    </h3>
                    
                    <p className="text-emerald-800 font-extrabold text-lg mt-0.5">
                      ₹{product.price}
                    </p>
                    
                    {/* Balanced Controls Container row */}
                    <div className="flex gap-2 mt-4 pt-3 border-t border-gray-50">
                      <Link
                        to={`/seller/edit/${product._id}`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 text-center bg-gray-50 hover:bg-emerald-50 border border-gray-100 hover:border-emerald-200 text-gray-700 hover:text-emerald-800 font-semibold py-2 rounded-xl text-xs transition"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        Edit Stock
                      </Link>
                      
                      <button
                        onClick={async () => {
                          const confirmDelete = window.confirm("Are you sure you want to delete this product listing from the storefront?");
                          if (!confirmDelete) return;

                          try {
                            await deleteProduct(product._id);
                            loadProducts();
                          } catch (error) {
                            console.error("Listing cleanup failure:", error);
                          }
                        }}
                        className="bg-white hover:bg-rose-50 border border-gray-100 hover:border-rose-200 text-gray-400 hover:text-rose-600 p-2 rounded-xl transition"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Leaderboard Analytics Panel */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 space-y-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 pb-4 border-b border-gray-50">
              <BarChart3 className="w-5 h-5 text-emerald-600" />
              Top Selling Velocity
            </h2>

            {isLoading ? (
              <div className="space-y-3 animate-pulse">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="h-10 bg-gray-50 rounded-xl w-full" />
                ))}
              </div>
            ) : analytics?.topProducts && Object.keys(analytics.topProducts).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(analytics.topProducts).map(([name, qty], index) => (
                  <div key={name} className="p-3 rounded-2xl bg-gray-50/60 border border-gray-100/30 space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-emerald-600 text-white font-mono text-[10px] font-black flex items-center justify-center shadow-sm">
                          {index + 1}
                        </span>
                        <span className="font-bold text-gray-800 line-clamp-1 max-w-[140px] sm:max-w-none">{name}</span>
                      </div>
                      <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {qty} units
                      </span>
                    </div>
                    {/* Visual Progress Mapping Track */}
                    <div className="w-full bg-gray-200/60 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-green-600 h-full rounded-full"
                        style={{ width: `${Math.min((qty / 100) * 100, 100)}%` }} // Dynamic fallback scaling bar mapping
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-xs font-medium py-4 text-center">
                Waiting for marketplace transaction metrics to generate performance charting logs.
              </p>
            )}
          </div>

        </div>

      </div>
    </MainLayout>
  );
}

export default SellerDashboard;