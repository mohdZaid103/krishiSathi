import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight, Calendar } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import { getMyOrders } from "../services/orderService.js";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      const data = await getMyOrders();
      setOrders(data);
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
      <div className="max-w-5xl mx-auto px-4 py-12">
        
        {/* Header Block */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-gray-100">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-gray-950">
              My Orders
            </h1>
            <p className="text-gray-500 text-sm font-medium mt-1">
              View, inspect, and monitor status tracking for your marketplace supplies.
            </p>
          </div>
          {!isLoading && orders.length > 0 && (
            <div className="bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider self-start md:self-auto">
              Total Orders: {orders.length}
            </div>
          )}
        </div>

        {/* Loading Skeleton State */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2].map((n) => (
              <div key={n} className="bg-white border border-gray-100 rounded-3xl p-6 h-40 animate-pulse flex flex-col justify-between">
                <div className="h-6 bg-gray-100 rounded-lg w-1/4"></div>
                <div className="h-4 bg-gray-100 rounded-lg w-1/2"></div>
                <div className="h-10 bg-gray-50 rounded-xl w-full"></div>
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-12 text-center max-w-xl mx-auto flex flex-col items-center">
            <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-600 mb-5">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              No Purchases Logged Yet
            </h2>
            <p className="text-gray-500 text-sm max-w-sm mt-2 leading-relaxed">
              Your order archive is completely empty. Explore the marketplace to secure fertilizers, treatments, and tools.
            </p>
            <Link
              to="/products"
              className="mt-6 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-5 py-3 rounded-xl shadow-md shadow-emerald-600/10 transition-all duration-300 transform active:scale-98"
            >
              Browse Marketplace
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-5">
            {orders.map((order) => (
              <Link
                key={order._id}
                to={`/orders/${order._id}`}
                className="group block bg-white border border-gray-100 rounded-3xl shadow-sm p-6 hover:shadow-xl hover:shadow-emerald-950/5 hover:border-emerald-500/30 transform transition-all duration-300 ease-out"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Order ID</span>
                      <span className="bg-gray-100 text-gray-700 text-xs font-mono font-bold px-2 py-0.5 rounded-md">
                        #{order._id.slice(-8).toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-gray-400">Status:</span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border capitalize shadow-sm ${getStatusStyles(order.status)}`}>
                        {order.status || "Processing"}
                      </span>
                    </div>
                  </div>

                  <div className="text-left sm:text-right w-full sm:w-auto sm:ml-auto">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Amount</p>
                    <p className="text-3xl font-black text-emerald-800 tracking-tight mt-0.5">
                      ₹{order.totalAmount}
                    </p>
                    <p className="text-xs text-gray-500 font-medium mt-1 flex items-center sm:justify-end gap-1">
                      <ShoppingBag className="w-3.5 h-3.5 text-gray-400" />
                      {order.items?.length || 0} Product(s) secured
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1.5 text-gray-500 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>Placed on {new Date(order.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}</span>
                  </div>

                  <span className="text-emerald-600 group-hover:text-emerald-700 font-bold flex items-center gap-1 transition-colors duration-300">
                    Inspect Order Invoice
                    <ArrowRight className="w-3.5 h-3.5 transform transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>

              </Link>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default Orders;
