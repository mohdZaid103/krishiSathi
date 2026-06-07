import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { placeOrder } from "../services/orderService.js";
import {
  createPaymentOrder,
  verifyPayment,
} from "../services/paymentService.js";

import {
  getCart,
  removeFromCart,
  addToCart,
  decreaseQuantity,
} from "../services/cartService";
import { useCart } from "../context/CartContext";
function Cart() {
  const { refreshCartCount } = useCart();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    city: "",
    state: "",
    pincode: "",
  });
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

  const handleCheckout = async () => {
    if (
  !address.fullName ||
  !address.phone ||
  !address.addressLine1 ||
  !address.city ||
  !address.state ||
  !address.pincode
) {
  alert(
    "Please fill shipping address"
  );
  return;
}
    try {
      setCheckoutLoading(true);

      const order = await createPaymentOrder();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: order.currency,

        name: "KrishiSathi",

        description: "Agricultural Products",

        order_id: order.id,

        handler: async (response) => {
          console.log("Payment Success:", response);

          await verifyPayment({
  ...response,
  shippingAddress:
    address,
});
          await refreshCartCount();

          alert("Order placed successfully!");

          await loadCart();
        },

        theme: {
          color: "#16a34a",
        },
      };

      const razor = new window.Razorpay(options);

      razor.open();
    } catch (error) {
      console.error(error);

      alert("Failed to start payment");
    } finally {
      setCheckoutLoading(false);
    }
  };

  // Modern Skeleton Loader UI
  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-6xl mx-auto px-6 py-16 animate-pulse">
          <div className="h-10 bg-zinc-200 rounded-lg w-48 mb-8"></div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {[1, 2].map((n) => (
                <div key={n} className="h-32 bg-zinc-100 rounded-3xl"></div>
              ))}
            </div>
            <div className="h-64 bg-zinc-100 rounded-3xl"></div>
          </div>
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
      <div className="bg-zinc-50 min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-extrabold text-zinc-900 tracking-tight mb-8">
            Shopping Cart
          </h1>

          {!cart?.items?.length ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-zinc-200 rounded-3xl p-12 text-center shadow-sm max-w-md mx-auto"
            >
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-zinc-800">
                Your cart is empty
              </h2>
              <p className="text-zinc-500 text-sm mt-1 mb-6">
                Looks like you haven't added any products yet.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-medium px-6 py-3 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Marketplace
              </Link>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              {/* Cart Items List */}
              <div className="lg:col-span-2 space-y-4">
                <AnimatePresence mode="popLayout">
                  {cart.items.map((item) => (
                    <motion.div
                      layout
                      key={item._id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                      className="bg-white border border-zinc-200/80 rounded-3xl p-5 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-zinc-300 transition-colors"
                    >
                      {/* Product Info Block */}
                      <div className="flex gap-4 items-center">
                        <div className="w-16 h-16 bg-zinc-50 border border-zinc-100 rounded-2xl flex items-center justify-center font-bold text-zinc-400">
                          📦
                        </div>
                        <div>
                          <h2 className="font-bold text-lg text-zinc-800 tracking-tight">
                            {item.productId.name}
                          </h2>
                          <p className="text-zinc-500 font-medium text-sm mt-0.5">
                            ₹{item.productId.price} / item
                          </p>
                        </div>
                      </div>

                      {/* Controls Area */}
                      <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-3 border-t sm:border-0 pt-3 sm:pt-0 border-zinc-100">
                        <div className="flex items-center gap-1.5 bg-zinc-100 p-1 rounded-xl">
                          <button
                            onClick={async () => {
                              try {
                                await decreaseQuantity(item.productId._id);

                                await refreshCartCount();

                                loadCart();
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            className="w-8 h-8 flex items-center justify-center bg-white text-zinc-700 rounded-lg hover:bg-zinc-50 active:scale-95 shadow-sm transition-all"
                          >
                            <Minus className="w-4 h-4" />
                          </button>

                          <span className="font-semibold min-w-[32px] text-center text-zinc-800 text-sm">
                            {item.quantity}
                          </span>

                          <button
                            onClick={async () => {
                              try {
                                await addToCart(item.productId._id);

                                await refreshCartCount();

                                loadCart();
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            className="w-8 h-8 flex items-center justify-center bg-green-600 text-white rounded-lg hover:bg-green-500 active:scale-95 shadow-sm transition-all"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center gap-4">
                          <p className="font-extrabold text-green-700 text-lg">
                            ₹{item.productId.price * item.quantity}
                          </p>

                          <button
                            onClick={async () => {
                              try {
                                await removeFromCart(item.productId._id);

                                await refreshCartCount();

                                loadCart();
                              } catch (err) {
                                console.error("Failed to remove item:", err);
                              }
                            }}
                            className="p-2 text-zinc-400 hover:text-red-500 rounded-xl hover:bg-red-50/50 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <div className="bg-white border rounded-3xl p-6 shadow-sm mb-6">
                <h3 className="text-xl font-bold mb-5">Shipping Address</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    placeholder="Full Name"
                    value={address.fullName}
                    onChange={(e) =>
                      setAddress({
                        ...address,
                        fullName: e.target.value,
                      })
                    }
                    className="border rounded-xl p-3"
                  />

                  <input
                    placeholder="Phone Number"
                    value={address.phone}
                    onChange={(e) =>
                      setAddress({
                        ...address,
                        phone: e.target.value,
                      })
                    }
                    className="border rounded-xl p-3"
                  />

                  <input
                    placeholder="City"
                    value={address.city}
                    onChange={(e) =>
                      setAddress({
                        ...address,
                        city: e.target.value,
                      })
                    }
                    className="border rounded-xl p-3"
                  />

                  <input
                    placeholder="State"
                    value={address.state}
                    onChange={(e) =>
                      setAddress({
                        ...address,
                        state: e.target.value,
                      })
                    }
                    className="border rounded-xl p-3"
                  />
                </div>

                <textarea
                  placeholder="Address Line"
                  value={address.addressLine1}
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      addressLine1: e.target.value,
                    })
                  }
                  className="
      w-full
      border
      rounded-xl
      p-3
      mt-4
    "
                />

                <input
                  placeholder="Pincode"
                  value={address.pincode}
                  onChange={(e) =>
                    setAddress({
                      ...address,
                      pincode: e.target.value,
                    })
                  }
                  className="
      mt-4
      border
      rounded-xl
      p-3
      w-full
    "
                />
              </div>

              {/* Sticky Order Summary Panel */}
              <div className="lg:sticky lg:top-6">
                <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-zinc-800 mb-4">
                    Summary
                  </h3>

                  <div className="space-y-3 pb-4 border-b border-zinc-100 text-sm font-medium text-zinc-500">
                    <div className="flex justify-between">
                      <span>Total Products Items</span>
                      <span className="text-zinc-800">
                        {cart.items.reduce(
                          (acc, item) => acc + item.quantity,
                          0,
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fees</span>
                      <span className="text-green-600 font-semibold">FREE</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-baseline pt-4 mb-6">
                    <span className="text-zinc-800 font-bold text-lg">
                      Grand Total
                    </span>
                    <span className="text-2xl font-black text-green-700">
                      ₹{total}
                    </span>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={checkoutLoading}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-700 to-green-600 hover:from-green-600 hover:to-green-500 disabled:from-zinc-400 disabled:to-zinc-300 text-white font-semibold py-4 rounded-2xl shadow-md shadow-green-900/10 active:scale-[0.99] transition-all"
                  >
                    {checkoutLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Placing
                        Order...
                      </>
                    ) : (
                      "Proceed to Checkout"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default Cart;
