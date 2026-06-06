// src/pages/Products.jsx

import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";
import { Search } from "lucide-react";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-500 text-white py-16">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold mb-4">
            Agricultural Marketplace
          </h1>

          <p className="text-lg opacity-90 max-w-2xl">
            Discover fertilizers, pesticides, fungicides and organic solutions
            for healthier crops and higher yields.
          </p>

        </div>
      </section>

      {/* Search */}
      <section className="max-w-7xl mx-auto px-6 py-8">

        <div className="relative max-w-xl">

          <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-500"
          />

        </div>

      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-12">

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}

        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <h2 className="text-xl text-gray-500">
              No products found
            </h2>
          </div>
        )}

      </section>

    </MainLayout>
  );
}

export default Products;