import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { 
  ClipboardList, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Package, 
  Calendar, 
  Loader2,
  CheckCircle2,
  Clock
} from "lucide-react";
import { getSellerOrders, updateOrderStatus } from "../services/sellerService";

function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      const data = await getSellerOrders();
      setOrders(data);
    } catch (error) {
      console.error("Failed to gather seller orders catalog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingOrderId(orderId);
      await updateOrderStatus(orderId, newStatus);
      // Refresh state from data source securely
      const freshData = await getSellerOrders();
      setOrders(freshData);
    } catch (error) {
      console.error("Status synchronization breakdown:", error);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const getStatusDropdownColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "border-emerald-200 text-emerald-700 bg-emerald-50/50 focus:ring-emerald-500/20";
      case "shipped":
        return "border-blue-200 text-blue-700 bg-blue-50/50 focus:ring-blue-500/20";
      case "pending":
        return "border-amber-200 text-amber-700 bg-amber-50/50 focus:ring-amber-500/20";
      case "processing":
        return "border-purple-200 text-purple-700 bg-purple-50/50 focus:ring-purple-500/20";
      default:
        return "border-gray-200 text-gray-700 bg-gray-50/50 focus:ring-gray-500/20";
    }
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-8">
        
        {/* Header Block Section */}
        <div className="pb-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-950 tracking-tight">Incoming Orders</h1>
            <p className="text-gray-500 text-sm font-medium mt-1">
              Fulfill incoming platform supply acquisitions and track logistics cycles.
            </p>
          </div>
          {!isLoading && orders.length > 0 && (
            <span className="bg-gray-100 border border-gray-200/60 text-gray-600 px-4 py-2 rounded-2xl text-xs font-bold tracking-wider uppercase self-start sm:self-auto">
              Active Logs: {orders.length}
            </span>
          )}
        </div>

        {/* Loading and Empty State Render Assignments */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2].map((n) => (
              <div key={n} className="bg-white border border-gray-100 rounded-3xl p-8 h-64 animate-pulse" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-12 text-center max-w-xl mx-auto flex flex-col items-center">
            <div className="p-4 bg-gray-50 rounded-2xl text-gray-400 mb-4">
              <ClipboardList className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">No Orders Queue Found</h2>
            <p className="text-gray-500 text-sm mt-1 max-w-xs leading-relaxed">
              You haven't received any purchase requests from marketplace farmers yet.
            </p>
          </div>
        ) : (
          
          /* Core Orders Processing Map Layout Container */
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-950/[0.02]"
              >
                
                {/* Individual Card Header Strip */}
                <div className="p-5 bg-gray-50/70 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Reference Track</span>
                      <h2 className="font-mono font-bold text-gray-900 text-sm sm:text-base">
                        #{order._id.toUpperCase()}
                      </h2>
                    </div>
                    <div className="h-6 w-px bg-gray-200 hidden sm:block" />
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {new Date(order.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric', month: 'short', day: 'numeric'
                      })}
                    </div>
                  </div>

                  {/* Enhanced Dropdown Menu Component */}
                  <div className="relative flex items-center gap-2">
                    {updatingOrderId === order._id && (
                      <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                    )}
                    <select
                      disabled={updatingOrderId === order._id}
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className={`font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl border transition shadow-sm focus:outline-none focus:ring-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${getStatusDropdownColor(order.status)}`}
                    >
                      <option value="Pending">⏳ Pending</option>
                      <option value="Processing">⚙️ Processing</option>
                      <option value="Shipped">📦 Shipped</option>
                      <option value="Delivered">✅ Delivered</option>
                    </select>
                  </div>
                </div>

                {/* Logistics Metadata Content Space */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm border-b border-gray-50">
                  
                  {/* Left Box: Customer Account Summary */}
                  <div className="bg-gray-50/40 border border-gray-100/50 p-4 rounded-2xl space-y-3">
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-gray-100/60">
                      <User className="w-3.5 h-3.5 text-emerald-600" />
                      Customer Profile Details
                    </h3>
                    <div className="space-y-1.5 font-semibold text-gray-800">
                      <p className="text-base font-black text-gray-900">{order.userId?.name || "Unknown Farmer"}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-2 font-medium">
                        <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        {order.userId?.email || "N/A"}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-2 font-medium">
                        <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        {order.shippingAddress?.phone || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Right Box: Target Shipping Destination Coordinates */}
                  <div className="bg-gray-50/40 border border-gray-100/50 p-4 rounded-2xl space-y-2">
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-gray-100/60">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      Logistics Delivery Target
                    </h3>
                    <div className="text-xs text-gray-600 font-medium space-y-1">
                      <p className="text-sm font-bold text-gray-800">{order.shippingAddress?.addressLine1}</p>
                      <p>{order.shippingAddress?.city}, {order.shippingAddress?.state}</p>
                      <div className="pt-1">
                        <span className="bg-gray-100 text-gray-700 font-mono font-bold px-2 py-0.5 rounded text-[10px] tracking-wide">
                          PIN {order.shippingAddress?.pincode}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Lower Segment Section: Ordered Products List Breakdown */}
                <div className="p-6 bg-gray-50/20 space-y-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Package className="w-4 h-4 text-emerald-600" />
                    Consignment Manifest
                  </h3>

                  <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl bg-white overflow-hidden shadow-sm">
                    {order.items.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center justify-between p-4 text-sm gap-4 hover:bg-gray-50/40 transition"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                          <span className="font-bold text-gray-900 line-clamp-1">
                            {item.productId?.name || "Platform Product Inventory Item"}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100 shrink-0">
                          Quantity: {item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Financial Settlement Grand Total Summary Box */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-semibold text-gray-400">Merchant Payout Ledger:</span>
                    <span className="text-xl font-black text-emerald-800 tracking-tight">
                      ₹{order.totalAmount}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default SellerOrders;