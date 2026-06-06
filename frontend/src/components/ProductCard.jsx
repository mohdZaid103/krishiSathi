// src/components/ProductCard.jsx

import { ShoppingCart, Star } from "lucide-react";
import { addToCart } from "../services/cartService";

function ProductCard({ product }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border hover:border-green-300 hover:shadow-xl transition-all duration-300">
      <div className="relative overflow-hidden">
        <img
          src={
            product.image ||
            "https://imgs.search.brave.com/0R-kYbFZ8IOMwqY0VvLmSIrkGXkdjMUXbdb3o_oyE2k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hZ3Jp/cGxleGluZGlhLmNv/bS9jZG4vc2hvcC9w/cm9kdWN0cy9zeW5n/ZW50YS0yMi5wbmc_/dj0xNzQzMjQxOTUy/JndpZHRoPTIwMDA"
          }
          alt={product.name}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
          {product.category}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-gray-600">4.8</span>
        </div>

        <h3 className="font-bold text-lg mb-2">{product.name}</h3>

        <p className="text-gray-500 text-sm line-clamp-2 mb-4">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-green-700">
              ₹{product.price}
            </p>

            <p className="text-xs text-gray-500">Stock: {product.stock}</p>
          </div>

          <button
            onClick={async () => {
              try {
                await addToCart(product._id);

                alert("Added to cart");
              } catch (error) {
                console.error(error);

                alert("Failed to add product");
              }
            }}
            className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-xl transition"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
