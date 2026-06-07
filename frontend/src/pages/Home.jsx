import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MainLayout from "../layouts/MainLayout";
import { 
  Scan, 
  Cpu, 
  ShoppingBag, 
  CheckCircle, 
  LayoutDashboard, 
  ShoppingBag as OrderIcon, 
  History, 
  User, 
  ArrowRight 
} from "lucide-react";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  }
};

function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-zinc-900"
      >
        {/* Background Image with Deep Overlay Blend */}
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105 transform transition-transform duration-1000"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2000')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950 via-zinc-900/80 to-transparent"></div>

        {/* Ambient Glow for Tech Aesthetic */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-6 w-full text-white z-10 py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-md mb-6">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
              AI-Powered Agriculture Platform
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold max-w-4xl tracking-tight leading-none"
          >
            Protect Your Crops with <br />
            <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
              Smart AI Detection
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-zinc-300 max-w-2xl font-light leading-relaxed"
          >
            Upload plant images, pinpoint diseases instantly with Gemini Vision AI, 
            receive tailored treatments, and access our secure marketplace directly.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mt-10"
          >
            <Link
              to="/detect"
              className="group relative inline-flex items-center justify-center bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg shadow-green-900/30 hover:shadow-green-500/20 active:scale-[0.98] transition-all duration-200 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Detect Disease <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              to="/products"
              className="inline-flex items-center justify-center bg-white/5 border border-white/20 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-2xl backdrop-blur-md active:scale-[0.98] transition-all duration-200"
            >
              Browse Marketplace
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Counter Stats Banner */}
      <section className="relative z-20 -mt-8 max-w-6xl mx-auto px-4">
        <div className="bg-gradient-to-r from-green-700 to-green-600 text-white rounded-3xl p-8 md:p-10 shadow-xl shadow-green-950/20 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-green-500/30">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-300">Gemini</h2>
            <p className="text-xs md:text-sm text-green-100 font-medium mt-1">Vision AI Engine</p>
          </div>
          <div className="text-center pl-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-300">24/7</h2>
            <p className="text-xs md:text-sm text-green-100 font-medium mt-1">Instant Support</p>
          </div>
          <div className="text-center pl-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-300">Smart</h2>
            <p className="text-xs md:text-sm text-green-100 font-medium mt-1">Product Match</p>
          </div>
          <div className="text-center pl-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-300">Fast</h2>
            <p className="text-xs md:text-sm text-green-100 font-medium mt-1">Secure Delivery</p>
          </div>
        </div>
      </section>

      {/* Features Blueprint (How It Works) */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold text-zinc-900 tracking-tight">
              How KrishiSathi Works
            </h2>
            <div className="w-16 h-1 bg-green-600 mx-auto mt-4 rounded-full"></div>
            <p className="text-zinc-500 mt-4 text-lg">
              Get diagnostic reports and verified active treatments in four simple actions.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* Step 1 */}
            <motion.div variants={itemVariants} className="bg-white rounded-3xl border border-zinc-100 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-5 font-bold">
                <Scan className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-800 mb-2">1. Scan Crop</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Take or upload a clean snapshot of the plant's affected foliage leaves.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div variants={itemVariants} className="bg-white rounded-3xl border border-zinc-100 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-yellow-50 text-yellow-600 flex items-center justify-center mb-5 font-bold">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-800 mb-2">2. AI Diagnostics</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Gemini processes the symptoms instantly to return deep condition insights.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div variants={itemVariants} className="bg-white rounded-3xl border border-zinc-100 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-5 font-bold">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-800 mb-2">3. Recommended Care</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Get specific prescription advice mapping back to precise curative items.
              </p>
            </motion.div>

            {/* Step 4 */}
            <motion.div variants={itemVariants} className="bg-white rounded-3xl border border-zinc-100 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-yellow-50 text-yellow-600 flex items-center justify-center mb-5 font-bold">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-800 mb-2">4. Instant Cart Checkout</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Order authentic protection kits directly right through our marketplace ecosystem.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Access Dashboard Navigation Matrix */}
      <section className="py-24 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold text-zinc-900 tracking-tight">
              Control Center Matrix
            </h2>
            <p className="text-zinc-500 mt-3 text-lg">
              Quickly navigate through your primary application modules.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {matrixLinks.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link 
                  to={item.to} 
                  className="group flex flex-col items-center text-center p-6 bg-zinc-50 border border-zinc-200/60 rounded-2xl hover:bg-white hover:border-green-600/50 hover:shadow-xl hover:shadow-green-950/5 transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300 ${item.colorClass}`}>
                    {item.icon}
                  </div>
                  <span className="font-semibold text-zinc-800 text-sm group-hover:text-green-700 transition-colors">
                    {item.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}

// Map configuration for clean matrix links loop
const matrixLinks = [
  { to: "/detect", label: "Analyze Leaf", icon: <Scan className="w-5 h-5" />, colorClass: "bg-green-50 text-green-600" },
  { to: "/products", label: "Marketplace", icon: <ShoppingBag className="w-5 h-5" />, colorClass: "bg-yellow-50 text-yellow-600" },
  { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, colorClass: "bg-green-50 text-green-600" },
  { to: "/orders", label: "Track Orders", icon: <OrderIcon className="w-5 h-5" />, colorClass: "bg-yellow-50 text-yellow-600" },
  { to: "/history", label: "Scan Log", icon: <History className="w-5 h-5" />, colorClass: "bg-green-50 text-green-600" },
  { to: "/profile", label: "Farmer Profile", icon: <User className="w-5 h-5" />, colorClass: "bg-yellow-50 text-yellow-600" },
];

export default Home;
