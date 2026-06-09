// src/components/ProductCard.jsx

import { useState } from "react";
import { ShoppingCart, Star, Check, Loader2 } from "lucide-react";
import { addToCart } from "../services/cartService";
import toast from "react-hot-toast";
import {
  useCart,
} from "../context/CartContext";
function ProductCard({ product }) {
    const {
  refreshCartCount,
} = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  const handleAddToCart = async () => {
    if (isAdding || isOutOfStock) return;
    
    setIsAdding(true);
    try {
      await addToCart(product._id);
    
      setIsSuccess(true);
      await refreshCartCount();
      
      // Reset success state checkmark icon after 2 seconds
      setTimeout(() => setIsSuccess(false), 2000);
    } catch (error) {
      console.error(error);
      // Optional: Replace this with a toast notification context call if you build one later
      toast.success("Failed to add product to cart");
    } finally {
      setIsAdding(false);
    }
  };


  return (
    <div className={`group bg-white rounded-3xl overflow-hidden border border-gray-100/80 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-950/5 transition-all duration-500 ease-out flex flex-col relative ${isOutOfStock ? "opacity-75" : ""}`}>
      
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-50 aspect-[4/3]">
        <img
          src={
            product.image ||
            "https://imgs.search.brave.com/0R-kYbFZ8IOMwqY0VvLmSIrkGXkdjMUXbdb3o_oyE2k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hZ3Jp/cGxleGluZGlhLmNv/bS9jZG4vc2hvcC9w/cm9kdWN0cy9zeW5n/ZW50YS0yMi5wbmc_/dj0xNzQzMjQxOTUy/JndpZHRoPTIwMDA"
          }
          alt={product.name}
          className={`w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105 ${isOutOfStock ? "filter grayscale" : ""}`}
        />

        {/* Dynamic Badges Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <span className="absolute top-4 left-4 bg-emerald-600 backdrop-blur-md bg-opacity-90 text-white text-xs font-semibold tracking-wider px-3.5 py-1.5 rounded-full shadow-sm uppercase">
          {product.category}
        </span>

        {isOutOfStock && (
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-white/95 text-gray-900 font-bold px-4 py-2 rounded-2xl shadow-md tracking-wide text-sm">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow">
        
        {/* Rating & Stock Summary */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1 bg-amber-50/80 px-2.5 py-1 rounded-lg">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-amber-800">4.8</span>
          </div>

          {isLowStock && (
            <span className="text-[11px] font-semibold tracking-wide text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg animate-pulse">
              Only {product.stock} left!
            </span>
          )}
        </div>

        {/* Product Title */}
        <h3 className="font-bold text-gray-900 text-lg mb-1.5 group-hover:text-emerald-700 transition-colors duration-300 line-clamp-1">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm line-clamp-2 mb-6 leading-relaxed">
          {product.description}
        </p>

        {/* Price & Action Button Footer */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <div>
            <p className="text-2xl font-black text-emerald-800 tracking-tight">
              ₹{product.price}
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5 font-medium">
              Available Stock: {product.stock}
            </p>
          </div>

          <button
            disabled={isOutOfStock || isAdding}
            onClick={handleAddToCart}
            className={`flex items-center justify-center p-3.5 rounded-2xl transition-all duration-300 active:scale-95 border focus:outline-none ${
              isSuccess 
                ? "bg-green-600 border-green-600 text-white shadow-lg shadow-green-600/20" 
                : isOutOfStock 
                ? "bg-gray-100 border-gray-100 text-gray-400 cursor-not-allowed" 
                : "bg-emerald-50 border-emerald-100 text-emerald-700 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 shadow-sm shadow-emerald-700/5"
            }`}
          >
            {isAdding ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : isSuccess ? (
              <Check className="w-5 h-5" />
            ) : (
              <ShoppingCart className="w-5 h-5" />
            )}
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductCard;
