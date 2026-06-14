import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  UploadCloud,
  FileImage,
  AlertTriangle,
  CheckCircle,
  ShoppingCart,
  Loader2,
} from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import axios from "axios";
import toast from "react-hot-toast";
import { addToCart } from "../services/cartService.js";
import { useCart } from "../context/CartContext";

function DetectDisease() {
  const { refreshCartCount } = useCart();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [addingCartId, setAddingCartId] = useState(null);
  const fileInputRef = useRef(null);

  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const handleFileChange = (file) => {
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setResult(null); // Clear previous result on new selection
    } else {
      toast.success("Please upload a valid image file.");
    }
  };

  const handleAnalyze = async () => {
    if (!image) {
      toast.success("Please select or drop an image first.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", image);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${SERVER_URL}/api/disease/detect`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setResult(response.data);
    } catch (error) {
      console.error(error);
      toast.success("Analysis failed. Please check your backend connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    setAddingCartId(productId);
    try {
      await addToCart(productId);
      await refreshCartCount();
      toast.success("Added to cart successfully!");
    } catch (error) {
      console.error(error);
      toast.success("Failed to add to cart");
    } finally {
      setAddingCartId(null);
    }
  };

  const getSeverityStyles = (severity) => {
    const status = severity?.toLowerCase() || "";
    if (status.includes("high") || status.includes("severe")) {
      return "bg-red-50 text-red-700 border-red-200 text-red-600";
    }
    if (status.includes("medium") || status.includes("moderate")) {
      return "bg-amber-50 text-amber-700 border-amber-200 text-amber-500";
    }
    return "bg-green-50 text-green-700 border-green-200 text-green-600";
  };

  return (
    <MainLayout>
      <div className="bg-zinc-50/50 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-6">
          {/* Title Header Section */}
          <div className="mb-10 text-center sm:text-left">
            <h1 className="text-4xl font-black text-zinc-900 tracking-tight">
              AI Plant Health Diagnostics
            </h1>
            <p className="text-zinc-500 font-medium mt-1">
              Upload a snapshot of your crop foliage to instantly map crop
              diseases using Gemini Vision AI.
            </p>
          </div>

          {/* Interactive Drag & Drop Upload Zone Container */}
          <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 shadow-sm">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={(e) => handleFileChange(e.target.files[0])}
            />

            <div
              onClick={() => fileInputRef.current.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleFileChange(e.dataTransfer.files[0]);
              }}
              className="border-2 border-dashed border-zinc-200 hover:border-green-600/60 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer bg-zinc-50/50 hover:bg-white transition-all duration-300 relative overflow-hidden group"
            >
              {imagePreview ? (
                <div className="relative w-full max-w-sm rounded-xl overflow-hidden shadow-inner bg-zinc-900 flex items-center justify-center aspect-video">
                  <img
                    src={imagePreview}
                    alt="Crop Leaf Preview"
                    className="w-full h-full object-cover"
                  />

                  {/* Premium Gemini Laser Scan Animation Effect Bar */}
                  {loading && (
                    <motion.div
                      initial={{ top: "0%" }}
                      animate={{ top: "100%" }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "linear",
                      }}
                      className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-green-400 to-transparent shadow-lg shadow-green-400 z-10"
                    />
                  )}
                </div>
              ) : (
                <>
                  <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <p className="font-bold text-zinc-800 text-center">
                    Drag and drop your crop leaf image here
                  </p>
                  <p className="text-xs text-zinc-400 mt-1">
                    Supports PNG, JPG or JPEG formatting files
                  </p>
                  <button className="mt-4 text-xs font-bold text-green-700 bg-green-50 border border-green-200/40 px-4 py-2 rounded-xl group-hover:bg-green-600 group-hover:text-white transition-colors">
                    Browse Files
                  </button>
                </>
              )}
            </div>

            {/* Form Actions bar */}
            <div className="flex items-center justify-end mt-6 pt-4 border-t border-zinc-100">
              <button
                onClick={handleAnalyze}
                disabled={loading || !image}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-700 to-green-600 hover:from-green-600 hover:to-green-500 disabled:from-zinc-300 disabled:to-zinc-200 text-white font-semibold px-8 py-3.5 rounded-xl shadow-md shadow-green-900/10 active:scale-[0.99] transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Doing
                    Analysis...
                  </>
                ) : (
                  <>Run Diagnostics</>
                )}
              </button>
            </div>
          </div>

          {/* AI Output Generation Section Block */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-10 space-y-6"
              >
                {/* Core Diagnostics Base Overview Data Block */}
                <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-green-700 mb-4">
                    Complete
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100">
                    <div>
                      <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                        Identified Condition
                      </span>
                      <h2 className="text-2xl font-black text-zinc-800 tracking-tight mt-0.5">
                        {result.disease}
                      </h2>
                    </div>

                    <div
                      className={`inline-flex items-center gap-1.5 px-4 py-1.5 border rounded-full text-sm font-bold self-start sm:self-auto ${getSeverityStyles(result.severity)}`}
                    >
                      <AlertTriangle className="w-4 h-4" /> Severity:{" "}
                      {result.severity}
                    </div>
                  </div>

                  {/* Split Details Section Grid for Symptoms & Treatment Overview */}
                  <div className="grid md:grid-cols-2 gap-8 mt-6">
                    <div>
                      <h3 className="font-bold text-zinc-800 text-base mb-3 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />{" "}
                        Observed Symptoms
                      </h3>
                      <ul className="space-y-2">
                        {result.symptoms?.map((symptom, index) => (
                          <li
                            key={index}
                            className="text-sm text-zinc-600 bg-zinc-50/60 border border-zinc-100 px-3 py-2.5 rounded-xl flex items-start gap-2.5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-1.5 flex-shrink-0" />
                            <span>{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-bold text-zinc-800 text-base mb-3 flex items-center gap-2">
                        AI Treatment Plan
                      </h3>
                      <div className="text-sm text-zinc-600 leading-relaxed bg-green-50/30 border border-green-600/10 p-4 rounded-xl">
                        <ul className="space-y-2">
                          {(Array.isArray(result.treatment)
                            ? result.treatment
                            : [result.treatment]
                          ).map((item, index) => (
                            <li key={index}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* E-Commerce Recommended Items Connection Ecosystem Section */}
                {result.products && result.products.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-zinc-800 tracking-tight mb-4 flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5 text-green-600" />{" "}
                      Automated Product Interventions
                    </h3>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {result.products.map((product) => (
                        <div
                          key={product._id}
                          className="bg-white border border-zinc-200/80 hover:border-zinc-300 rounded-2xl p-5 shadow-sm flex flex-col justify-between transition-all"
                        >
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <h4 className="font-bold text-zinc-800 text-base tracking-tight group-hover:text-green-700">
                                {product.name}
                              </h4>
                              <span className="text-[10px] font-bold uppercase tracking-wider bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded-md flex-shrink-0">
                                {product.category}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-400 mt-1">
                              Matched treatment item for targeting{" "}
                              {result.disease}.
                            </p>
                          </div>

                          <div className="flex items-center justify-between gap-4 mt-6 border-t border-zinc-100 pt-3">
                            <p className="text-xl font-black text-green-700">
                              ₹{product.price}
                            </p>

                            <button
                              onClick={() => handleAddToCart(product._id)}
                              disabled={addingCartId === product._id}
                              className="inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-500 disabled:bg-zinc-300 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm active:scale-95"
                            >
                              {addingCartId === product._id ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <>
                                  <ShoppingCart className="w-3.5 h-3.5" /> Add
                                  to Cart
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </MainLayout>
  );
}

export default DetectDisease;
