import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { placeOrder } from "../services/orderService";
import {
  getCart,
  removeFromCart,
  addToCart,
  decreaseQuantity,
} from "../services/cartService";

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const data = await getCart();
      setCart(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-bold">Loading Cart...</h1>
        </div>
      </MainLayout>
    );
  }

  const total =
    cart?.items?.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0,
    ) || 0;

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        {!cart?.items?.length ? (
          <div className="bg-white rounded-xl p-6 shadow">
            Your cart is empty
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl p-4 shadow flex justify-between items-center"
                >
                  {/* Product Details */}
                  <div>
                    <h2 className="font-semibold text-lg">
                      {item.productId.name}
                    </h2>

                    <p className="text-gray-500">₹{item.productId.price}</p>
                  </div>

                  {/* Quantity Controls + Price */}
                  <div className="flex flex-col items-end gap-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={async () => {
                          try {
                            await decreaseQuantity(item.productId._id);
                            loadCart();
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        className="w-8 h-8 bg-gray-200 rounded-lg hover:bg-gray-300"
                      >
                        -
                      </button>

                      <span className="font-medium min-w-[20px] text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={async () => {
                          try {
                            await addToCart(item.productId._id);
                            loadCart();
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        className="w-8 h-8 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        +
                      </button>
                    </div>

                    <p className="font-bold text-green-700">
                      ₹{item.productId.price * item.quantity}
                    </p>

                    <button
                      onClick={async () => {
                        try {
                          await removeFromCart(item.productId._id);

                          loadCart();
                        } catch (err) {
                          console.error("Failed to remove item:", err);
                        }
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 text-sm rounded-lg"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-8 bg-white rounded-xl p-6 shadow">
              <div className="flex justify-between text-xl font-bold">
                <button
                  onClick={async () => {
                    try {
                      await placeOrder();

                      alert("Order placed successfully");

                      loadCart();
                    } catch (error) {
                      console.error(error);

                      alert("Failed to place order");
                    }
                  }}
                  className="w-full mt-6 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700"
                >
                  Checkout
                </button>
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}

export default Cart;
