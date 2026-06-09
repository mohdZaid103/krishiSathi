import { useState } from "react";
import { motion } from "framer-motion";
import { loginWithGoogle } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Sparkles, Loader2, Tractor, Store } from "lucide-react";
import toast from "react-hot-toast";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [authLoading, setAuthLoading] = useState(false);
  const [role, setRole] = useState("farmer");

  const handleLogin = async () => {
    try {
      setAuthLoading(true);
      const data = await loginWithGoogle(role);
      login(data.user);
      navigate("/");
    } catch (error) {
      console.error("Authentication handshake error:", error);
      toast.success("Google login failed. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col md:flex-row overflow-hidden">
      
      {/* Left Column: Visual Brand Banner Showcase */}
      <div 
        className="relative md:w-1/2 bg-zinc-950 flex flex-col justify-between p-8 md:p-12 text-white overflow-hidden min-h-[35vh] md:min-h-screen"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 scale-105"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-zinc-950/80 to-zinc-950/40" />

        <div className="relative z-10 flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center font-bold text-lg text-white shadow-md shadow-green-900/30">
            🌱
          </div>
          <span className="font-black text-xl tracking-tight bg-gradient-to-r from-white to-zinc-200 bg-clip-text text-transparent">
            KrishiSathi
          </span>
        </div>

        <div className="relative z-10 mt-auto max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-1 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 px-3 py-1 rounded-full text-xs font-semibold mb-4 backdrop-blur-sm">
              <Sparkles className="w-3 h-3 fill-yellow-300" /> Powered by Gemini Vision
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              Smart Diagnostics <br />For Sustainable Yields.
            </h2>
            <p className="text-sm text-zinc-300 font-light mt-3 leading-relaxed">
              Join our platform to instantly map crop leaf anomalies, acquire localized chemical care recipes, and access our secure verified agricultural marketplace.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Column: Interaction Authentication Interface Card */}
      <div className="md:w-1/2 flex items-center justify-center p-6 bg-zinc-50 border-t md:border-t-0 md:border-l border-zinc-200/60">
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-md bg-white border border-zinc-200/80 rounded-3xl p-8 shadow-xl shadow-zinc-950/[0.02]"
        >
          {/* Header Typography Elements */}
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-black text-zinc-900 tracking-tight">
              Portal Entrance
            </h1>
            <p className="text-sm text-zinc-400 font-medium mt-1">
              Select your system profile role to log in securely.
            </p>
          </div>

          {/* Premium Upgraded Role Selection Section */}
          <div className="space-y-3 mb-6">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1">
              Identify Your Identity
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Farmer Selection Card */}
              <button
                type="button"
                onClick={() => setRole("farmer")}
                className={`flex items-start gap-3 p-4 rounded-2xl border text-left transition-all duration-300 focus:outline-none ${
                  role === "farmer"
                    ? "bg-emerald-50/70 text-emerald-900 border-emerald-500/50 shadow-sm ring-1 ring-emerald-500/20"
                    : "bg-white text-zinc-600 border-zinc-100 hover:bg-zinc-50/50 hover:border-zinc-300"
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                  role === "farmer" ? "bg-emerald-600 text-white" : "bg-zinc-100 text-zinc-500"
                }`}>
                  <Tractor className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-sm">Farmer</p>
                  <p className="text-[11px] text-zinc-400 mt-0.5 font-medium leading-tight">Access AI diagnostics & buy supplies</p>
                </div>
              </button>

              {/* Seller Selection Card */}
              <button
                type="button"
                onClick={() => setRole("seller")}
                className={`flex items-start gap-3 p-4 rounded-2xl border text-left transition-all duration-300 focus:outline-none ${
                  role === "seller"
                    ? "bg-emerald-50/70 text-emerald-900 border-emerald-500/50 shadow-sm ring-1 ring-emerald-500/20"
                    : "bg-white text-zinc-600 border-zinc-100 hover:bg-zinc-50/50 hover:border-zinc-300"
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                  role === "seller" ? "bg-emerald-600 text-white" : "bg-zinc-100 text-zinc-500"
                }`}>
                  <Store className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-sm">Seller</p>
                  <p className="text-[11px] text-zinc-400 mt-0.5 font-medium leading-tight">Manage shop stock & supply inventories</p>
                </div>
              </button>
            </div>
          </div>

          {/* Explicit OAuth Entry Trigger Button */}
          <button
            onClick={handleLogin}
            disabled={authLoading}
            className="w-full group inline-flex items-center justify-center gap-3 bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-zinc-300 text-zinc-700 font-bold py-4 px-6 rounded-2xl active:scale-[0.99] shadow-sm transition-all duration-200 disabled:bg-zinc-50 disabled:text-zinc-400"
          >
            {authLoading ? (
              <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
            ) : (
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  fill="#FBBC05"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            )}
            <span>{authLoading ? "Verifying Account..." : "Continue with Google"}</span>
          </button>

          {/* Privacy Footnote Agreement */}
          <p className="text-[11px] text-zinc-400 font-medium leading-relaxed text-center mt-8">
            By continuing, you agree to KrishiSathi's verified operational terms of service and automated agricultural diagnostic policy protocols.
          </p>

        </motion.div>
      </div>

    </div>
  );
}

export default Login;