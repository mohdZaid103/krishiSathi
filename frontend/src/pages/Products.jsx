import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainLayout from "../layouts/MainLayout";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";
import { Search, ShoppingBag, Sprout, Filter, X } from "lucide-react";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const gridItemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 15 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  }
};

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Marketplace fetch failure:", error);
    } finally {
      setLoading(false);
    }
  };

  // Derive active dynamic categories safely for filters
  const categories = ["All", ...new Set(products.map(p => p.category).filter(Boolean))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout>
      <div className="bg-green-50/50 min-h-screen">
        
        {/* Premium Hero Section Banner */}
        <section className="relative bg-green-950 text-white py-20 overflow-hidden">
          {/* Subtle natural organic texture overlay layer */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20 mixed-blend-overlay"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1500')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-green-950 via-zinc-950 to-transparent"></div>
          
          {/* Ambient Brand Tech Glow Background Layer */}
          <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-green-500/10 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="relative max-w-7xl mx-auto px-6 z-10">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-semibold mb-4 backdrop-blur-md">
                <Sprout className="w-3.5 h-3.5 text-yellow-400" /> KrishiSathi Verified Supplies
              </span>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none mb-4">
                Agricultural Marketplace
              </h1>
              <p className="text-zinc-300 font-light text-base md:text-lg max-w-2xl leading-relaxed">
                Browse verified high-yield fertilizers, chemical treatments, and fungicides recommended precisely for organic restorative farm care.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Control Center Filtering Shell Area */}
        <section className="max-w-7xl mx-auto px-6 pt-10 pb-6">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-white border border-zinc-200/80 p-4 rounded-3xl shadow-sm">
            
            {/* Search Input Pod */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-10 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none text-zinc-700 text-sm font-medium placeholder-zinc-400 focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-600/5 transition-all"
              />
              {search && (
                <button 
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-3.5 p-0.5 text-zinc-400 hover:text-zinc-600 rounded-md hover:bg-zinc-200/50 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Pill Categories Filter Scroller */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none snap-x">
              <div className="flex items-center text-zinc-400 text-xs font-bold uppercase tracking-wider gap-1.5 px-1 flex-shrink-0">
                <Filter className="w-3.5 h-3.5 text-green-600" /> Filter:
              </div>
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs font-bold px-4 py-2.5 rounded-xl snap-start border transition-all duration-200 flex-shrink-0 ${
                      isActive 
                        ? "bg-green-600 border-green-600 text-white shadow-md shadow-green-900/10" 
                        : "bg-zinc-50 hover:bg-zinc-100 text-zinc-600 border-zinc-200"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

          </div>
        </section>

        {/* Products Display Core Grid Panel */}
        <section className="max-w-7xl mx-auto px-6 pb-20">
          {loading ? (
            /* Premium Content Mask Skeleton Loop Loader */
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="bg-white border border-zinc-200/60 rounded-3xl p-5 space-y-4 animate-pulse">
                  <div className="bg-zinc-100 aspect-square w-full rounded-2xl"></div>
                  <div className="h-4 bg-zinc-100 rounded w-2/3"></div>
                  <div className="h-3 bg-zinc-100 rounded w-1/2"></div>
                  <div className="flex justify-between items-center pt-2">
                    <div className="h-5 bg-zinc-100 rounded w-1/4"></div>
                    <div className="h-8 bg-zinc-100 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <AnimatePresence mode="popLayout">
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {filteredProducts.map((product) => (
                    <motion.div 
                      key={product._id} 
                      variants={gridItemVariants}
                      layout
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Universal Zero State Empty Template Block */}
              {filteredProducts.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-zinc-200 rounded-3xl p-16 text-center max-w-sm mx-auto shadow-sm mt-8"
                >
                  <div className="w-14 h-14 rounded-2xl bg-zinc-50 text-zinc-400 flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold text-zinc-800">No products match</h2>
                  <p className="text-zinc-500 text-xs font-medium mt-1">
                    Try adjusting your typing strings or clearing selected filter tags.
                  </p>
                </motion.div>
              )}
            </>
          )}
        </section>

      </div>
    </MainLayout>
  );
}

export default Products;
