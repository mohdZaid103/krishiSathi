import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getDashboard } from "../services/dashboardService.js";
import { motion } from "framer-motion";
import {
  Package,
  ShoppingCart,
  Leaf,
  ScanLine,
  ClipboardList,
  User,
  ArrowRight,
  Calendar,
  Layers,
  Activity
} from "lucide-react";
import { Link } from "react-router-dom";

// Animation Configurations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 14 } 
  }
};

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const result = await getDashboard();
      setData(result);
    } catch (error) {
      console.error(error);
    }
  };

  // Upgraded Skeleton Loader Dashboard UI
  if (!data) {
    return (
      <MainLayout>
        <div className="bg-zinc-50 min-h-screen py-12 animate-pulse">
          <div className="max-w-7xl mx-auto px-6">
            <div className="h-10 bg-zinc-200 rounded-lg w-56 mb-2"></div>
            <div className="h-5 bg-zinc-200 rounded-lg w-72 mb-10"></div>
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[1, 2, 3].map((n) => <div key={n} className="h-32 bg-zinc-200/80 rounded-3xl"></div>)}
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="h-80 bg-zinc-200/80 rounded-3xl"></div>
              <div className="h-80 bg-zinc-200/80 rounded-3xl"></div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Severity style helper mapping functions
  const getSeverityBadge = (severity) => {
    const low = "bg-green-50 text-green-700 border-green-200/60";
    const med = "bg-yellow-50 text-amber-700 border-yellow-200/60";
    const high = "bg-red-50 text-red-700 border-red-200/60";
    
    const status = severity?.toLowerCase() || "";
    if (status.includes("high") || status.includes("severe")) return high;
    if (status.includes("medium") || status.includes("moderate")) return med;
    return low;
  };

  return (
    <MainLayout>
      <div className="bg-zinc-50/50 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header section info welcome banner */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-zinc-200/60 pb-8"
          >
            <div>
              <h1 className="text-4xl font-black text-zinc-900 tracking-tight flex items-center gap-2">
                Welcome Back <span className="animate-bounce origin-bottom-right inline-block">👋</span>
              </h1>
              <p className="text-zinc-500 font-medium mt-1">
                Here is your farm's health metrics and marketplace tracking overview.
              </p>
            </div>
            
            <Link to="/detect" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-5 py-3 rounded-2xl shadow-sm shadow-green-900/10 self-start md:self-auto transition-all active:scale-[0.98]">
              <ScanLine className="w-4 h-4" /> Run New Leaf Scan
            </Link>
          </motion.div>

          {/* Core Analytics Cards Metrics Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid sm:grid-cols-3 gap-6 mt-10"
          >
            {/* Metric Item 1 */}
            <motion.div variants={cardVariants} whileHover={{ y: -4 }} className="bg-white rounded-3xl border border-zinc-200/80 p-6 shadow-sm flex items-center justify-between group transition-all">
              <div>
                <p className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Marketplace Products</p>
                <h2 className="text-4xl font-black text-zinc-800 tracking-tight mt-1 group-hover:text-green-600 transition-colors">{data.totalProducts}</h2>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
                <Package className="w-6 h-6" />
              </div>
            </motion.div>

            {/* Metric Item 2 */}
            <motion.div variants={cardVariants} whileHover={{ y: -4 }} className="bg-white rounded-3xl border border-zinc-200/80 p-6 shadow-sm flex items-center justify-between group transition-all">
              <div>
                <p className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Total Active Orders</p>
                <h2 className="text-4xl font-black text-zinc-800 tracking-tight mt-1 group-hover:text-yellow-600 transition-colors">{data.totalOrders}</h2>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-yellow-50 text-yellow-600 flex items-center justify-center">
                <ShoppingCart className="w-6 h-6" />
              </div>
            </motion.div>

            {/* Metric Item 3 */}
            <motion.div variants={cardVariants} whileHover={{ y: -4 }} className="bg-white rounded-3xl border border-zinc-200/80 p-6 shadow-sm flex items-center justify-between group transition-all">
              <div>
                <p className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Gemini Leaf Scans</p>
                <h2 className="text-4xl font-black text-zinc-800 tracking-tight mt-1 group-hover:text-green-700 transition-colors">{data.totalDetections}</h2>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Leaf className="w-6 h-6" />
              </div>
            </motion.div>
          </motion.div>

          {/* Quick Hub Launch Action Grid */}
          <div className="mt-12">
            <h2 className="text-xl font-bold text-zinc-800 tracking-tight mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-600" /> System Control Shortcuts
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link to="/detect" className="group bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm hover:border-green-600/40 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform"><ScanLine className="w-5 h-5" /></div>
                <h3 className="font-bold text-zinc-800 group-hover:text-green-700 transition-colors">Analyze Plant Health</h3>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">Drop foliage photography and run computer vision mapping diagnostics.</p>
              </Link>

              <Link to="/orders" className="group bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm hover:border-yellow-600/40 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform"><ClipboardList className="w-5 h-5" /></div>
                <h3 className="font-bold text-zinc-800 group-hover:text-yellow-600 transition-colors">Track Orders Log</h3>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">Verify dispatch statuses and delivery routing items history timelines.</p>
              </Link>

              <Link to="/profile" className="group bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm hover:border-zinc-400 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 text-zinc-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform"><User className="w-5 h-5" /></div>
                <h3 className="font-bold text-zinc-800 group-hover:text-zinc-900 transition-colors">Farmer Profile</h3>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">Update dynamic addresses configurations and primary account details.</p>
              </Link>
            </div>
          </div>

          {/* Secondary Sub Logs Lists Grid Blocks */}
          <div className="grid lg:grid-cols-2 gap-8 mt-12 items-start">

            {/* Panel Area A: Scan Operations Logs */}
            <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-zinc-800 tracking-tight">Recent AI Diagnostics</h2>
                <Link to="/history" className="text-xs font-bold text-green-700 hover:text-green-600 flex items-center gap-1">All History <ArrowRight className="w-3 h-3" /></Link>
              </div>

              {data.recentDetections.length === 0 ? (
                <div className="text-center py-8 text-zinc-400 text-sm font-medium">No system diagnosis recorded yet.</div>
              ) : (
                <div className="divide-y divide-zinc-100">
                  {data.recentDetections.slice(0, 4).map((item) => (
                    <div key={item._id} className="py-4 flex items-center justify-between gap-4 group">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">🌿</span>
                        <div>
                          <p className="font-bold text-zinc-800 group-hover:text-green-700 transition-colors">{item.disease}</p>
                          <p className="text-xs text-zinc-400 font-medium mt-0.5">Automated Diagnostic Result</p>
                        </div>
                      </div>
                      <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 border rounded-full ${getSeverityBadge(item.severity)}`}>
                        {item.severity}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Panel Area B: Marketplace Order Trackings */}
            <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-zinc-800 tracking-tight">Recent Dispatch Orders</h2>
                <Link to="/orders" className="text-xs font-bold text-green-700 hover:text-green-600 flex items-center gap-1">All Orders <ArrowRight className="w-3 h-3" /></Link>
              </div>

              {data.recentOrders.length === 0 ? (
                <div className="text-center py-8 text-zinc-400 text-sm font-medium">No catalog shipments found.</div>
              ) : (
                <div className="space-y-4">
                  {data.recentOrders.slice(0, 3).map((item) => {
                    const total = item.items.reduce((sum, product) => sum + (product.productId?.price || 0) * product.quantity, 0);
                    return (
                      <div key={item._id} className="border border-zinc-200/60 rounded-2xl p-4 hover:border-zinc-300 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="text-xs font-bold bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded-md">📦 {item.items.length} Product(s)</span>
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-zinc-500 font-medium mt-2">
                              {item.items.map((prod, idx) => (
                                <span key={prod._id || idx}>{prod.productId?.name} ({prod.quantity}x)</span>
                              ))}
                            </div>
                          </div>
                          <span className="font-black text-green-700 text-base">₹{total}</span>
                        </div>
                        
                        <div className="flex items-center gap-1 text-[11px] font-bold text-zinc-400 mt-3 border-t border-zinc-100 pt-2">
                          <Calendar className="w-3 h-3" /> Ordered on {new Date(item.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard;