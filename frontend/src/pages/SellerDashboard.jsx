import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { Package, Plus } from "lucide-react";
import { getMyProducts } from "../services/sellerService.js";

function SellerDashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getMyProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">
              Seller Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your agricultural products
            </p>
          </div>

          <Link
            to="/seller/add-product"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <h3 className="text-gray-500">
              Total Products
            </h3>

            <p className="text-4xl font-bold mt-2">
              {products.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <h3 className="text-gray-500">
              Total Orders
            </h3>

            <p className="text-4xl font-bold mt-2">
              0
            </p>
          </div>

          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <h3 className="text-gray-500">
              Revenue
            </h3>

            <p className="text-4xl font-bold mt-2">
              ₹0
            </p>
          </div>

        </div>

        <div className="bg-white rounded-2xl border p-6">

          <h2 className="text-2xl font-bold mb-6">
            My Products
          </h2>

          {products.length === 0 ? (
            <div className="text-center py-16">

              <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />

              <h3 className="text-xl font-semibold">
                No products yet
              </h3>

              <p className="text-gray-500 mt-2">
                Add your first product to start selling.
              </p>

            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="border rounded-xl p-4"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />

                  <h3 className="font-bold mt-4">
                    {product.name}
                  </h3>

                  <p className="text-green-700 font-bold mt-2">
                    ₹{product.price}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </MainLayout>
  );
}

export default SellerDashboard;