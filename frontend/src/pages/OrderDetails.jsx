import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Calendar, 
  FileText, 
  ShoppingBag, 
  CreditCard, 
  MapPin, 
  Phone, 
  User, 
  Home, 
  AlertCircle 
} from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import { getOrderById } from "../services/orderService";

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    try {
      setIsLoading(true);
      const data = await getOrderById(id);
      setOrder(data);
    } catch (error) {
      console.error("Error loading order summary:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
          <div className="h-6 bg-gray-100 rounded-lg w-1/4 animate-pulse"></div>
          <div className="bg-white border border-gray-100 rounded-3xl p-8 h-48 animate-pulse"></div>
          <div className="bg-white border border-gray-100 rounded-3xl p-8 h-64 animate-pulse"></div>
        </div>
      </MainLayout>
    );
  }

  if (!order) {
    return (
      <MainLayout>
        <div className="max-w-md mx-auto px-4 py-16 text-center">
          <div className="p-4 bg-rose-50 text-rose-600 rounded-2xl inline-block mb-4">
            <FileText className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Order Not Found</h2>
          <p className="text-gray-500 text-sm mt-2">The order reference ID you are looking for does not exist or has been removed.</p>
          <Link to="/orders" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700">
            <ArrowLeft className="w-4 h-4" /> Return to Orders List
          </Link>
        </div>
      </MainLayout>
    );
  }

  const subtotal = order.items.reduce((sum, item) => {
    const price = item.productId?.price || 0;
    return sum + price * item.quantity;
  }, 0);

  const shippingFee = 0; 
  const totalAmount = subtotal + shippingFee;

  const getStatusStyles = (status) => {
    const formattedStatus = status?.toLowerCase() || "";
    switch (formattedStatus) {
      case "delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
      case "shipped":
        return "bg-blue-50 text-blue-700 border-blue-200/60";
      case "pending":
      case "processing":
        return "bg-amber-50 text-amber-700 border-amber-200/60";
      case "cancelled":
        return "bg-rose-50 text-rose-700 border-rose-200/60";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200/60";
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        
        <div>
          <Link
            to="/orders"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-emerald-700 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transform transition-transform group-hover:-translate-x-1" />
            Back to My Orders
          </Link>
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
          <div className="p-6 bg-gray-50/70 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5 text-gray-400" />
                Receipt Summary
              </div>
              <h1 className="text-xl font-mono font-black text-gray-900 tracking-tight">
                #{order._id.toUpperCase()}
              </h1>
            </div>

            <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold border capitalize self-start sm:self-auto shadow-sm ${getStatusStyles(order.status)}`}>
              {order.status || "Processing"}
            </span>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="flex items-center gap-3 bg-gray-50/40 p-4 rounded-2xl border border-gray-100/50">
              <Calendar className="w-5 h-5 text-gray-400 shrink-0" />
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Date Authorized</p>
                <p className="text-gray-900 font-semibold mt-0.5">
                  {new Date(order.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-gray-50/40 p-4 rounded-2xl border border-gray-100/50">
              <CreditCard className="w-5 h-5 text-gray-400 shrink-0" />
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Payment Status</p>
                <p className="text-emerald-700 font-semibold mt-0.5 flex items-center gap-1">
                  Completed Securely
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6 space-y-6">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 pb-4 border-b border-gray-50">
            <ShoppingBag className="w-5 h-5 text-emerald-600" />
            Purchased Supplies
          </h2>

          <div className="divide-y divide-gray-50">
            {order.items.map((item) => {
              if (!item.productId) return null;
              return (
                <div
                  key={item._id}
                  className="flex items-center justify-between py-4 first:pt-0 last:pb-0 gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl border border-gray-100 bg-gray-50 overflow-hidden shrink-0">
                      <img 
                        src={item.productId.image || "https://imgs.search.brave.com/0R-kYbFZ8IOMwqY0VvLmSIrkGXkdjMUXbdb3o_oyE2k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hZ3Jp/cGxleGluZGlhLmNv/bS9jZG4vc2hvcC9w/cm9kdWN0cy9zeW5n/ZW50YS0yMi5wbmc_/dj0xNzQzMjQxOTUy/JndpZHRoPTIwMDA"} 
                        alt={item.productId.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 line-clamp-1">{item.productId.name}</h3>
                      <p className="text-xs font-semibold text-gray-400 mt-0.5">
                        ₹{item.productId.price} <span className="text-gray-300 mx-1">×</span> Qty: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="font-extrabold text-gray-900 text-right shrink-0">
                    ₹{item.productId.price * item.quantity}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm mt-6 transition-all duration-300 hover:shadow-md">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 pb-4 border-b border-gray-50 mb-5">
            <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
            Shipping & Delivery Destination
          </h2>

          {order.shippingAddress ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
              <div className="space-y-3 bg-gray-50/50 p-4 rounded-2xl border border-gray-100/40 flex flex-col justify-center">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Recipient Name</p>
                    <p className="font-bold text-slate-900 text-base mt-0.5">
                      {order.shippingAddress.fullName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 pt-2 border-t border-gray-100/60">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Contact Number</p>
                    <p className="font-semibold text-slate-700 mt-0.5 tracking-wide">
                      {order.shippingAddress.phone}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 bg-gray-50/50 p-4 rounded-2xl border border-gray-100/40">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Home className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Delivery Logistics Target</p>
                  <p className="text-slate-800 font-medium leading-relaxed pt-1">
                    {order.shippingAddress.addressLine1}
                  </p>
                  <p className="text-slate-600 font-medium">
                    {order.shippingAddress.city}, {order.shippingAddress.state}
                  </p>
                  <div className="pt-1 inline-block">
                    <span className="bg-emerald-100/60 text-emerald-800 font-mono font-bold px-2.5 py-0.5 rounded-md text-xs tracking-wider shadow-sm">
                      PIN {order.shippingAddress.pincode}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-4 bg-amber-50/60 border border-amber-100 rounded-2xl text-amber-800">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="text-sm font-medium">
                No delivery coordinates or shipping address recorded for this invoice history ledger.
              </p>
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-6 space-y-4 max-w-md ml-auto">
          <div className="flex justify-between text-sm text-gray-500 font-medium">
            <span>Subtotal</span>
            <span className="text-gray-900">₹{subtotal}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500 font-medium">
            <span>Delivery Logistics</span>
            <span className="text-emerald-600 font-semibold">FREE</span>
          </div>
          <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
            <span className="text-base font-bold text-gray-900">Grand Total</span>
            <span className="text-2xl font-black text-emerald-800 tracking-tight">
              ₹{totalAmount}
            </span>
          </div>
        </div>

      </div>
    </MainLayout>
  );
}

export default OrderDetails;
