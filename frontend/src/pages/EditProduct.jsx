import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { getSellerProductById, updateProduct } from "../services/sellerService.js";
import toast from "react-hot-toast";
import { 
  Edit2, 
  ArrowLeft, 
  Tag, 
  IndianRupee, 
  PackageCheck, 
  Image, 
  FileText, 
  Loader2 
} from "lucide-react";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    image: "",
  });

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const product = await getSellerProductById(id);

      setFormData({
        name: product.name || "",
        description: product.description || "",
        category: product.category || "",
        price: product.price || "",
        stock: product.stock || "",
        image: product.image || "",
      });
    } catch (error) {
      console.error("Failed to retrieve product details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await updateProduct(id, formData);
      navigate("/seller");
    } catch (error) {
      console.error("Listing update failure:", error);
      toast.success("Failed to sync listing updates to the storefront catalog.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
          <div className="h-6 bg-gray-100 rounded-lg w-1/4 animate-pulse"></div>
          <div className="bg-white border border-gray-100 rounded-3xl p-8 h-96 anonymity animate-pulse"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        
        {/* Navigation Header Link */}
        <div>
          <Link
            to="/seller"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-emerald-700 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transform transition-transform group-hover:-translate-x-1" />
            Cancel and Return
          </Link>
        </div>

        {/* Master Editing Card Layout */}
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-xl shadow-gray-950/[0.01]">
          
          <div className="mb-8 pb-4 border-b border-gray-50 flex items-center gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <Edit2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">Modify Inventory Listing</h1>
              <p className="text-gray-400 text-xs font-medium mt-0.5">Revise parameters, change availability logs, or adjust catalog pricing.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Product Title Label field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Product Title</label>
              <input
                required
                name="name"
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-200/80 rounded-xl p-3.5 text-sm font-medium focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition"
              />
            </div>

            {/* Categorization Meta Configurations Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              <div className="space-y-1.5 md:col-span-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Market Category</label>
                <div className="relative">
                  <select
                    required
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border border-gray-200/80 bg-white rounded-xl p-3.5 text-sm font-semibold text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select Item Type</option>
                    <option value="Fertilizers">🌱 Fertilizers</option>
                    <option value="Pesticides">🛡️ Pesticides</option>
                    <option value="Fungicides">🔬 Fungicides</option>
                    <option value="Farming Tools">⚙️ Farming Tools</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                    <Tag className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Price Evaluation Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Retail Price (INR)</label>
                <div className="relative">
                  <input
                    required
                    name="price"
                    type="number"
                    min="1"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full border border-gray-200/80 rounded-xl py-3.5 pl-10 pr-4 text-sm font-bold tracking-tight text-gray-900 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition"
                  />
                  <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-gray-400">
                    <IndianRupee className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Stock Inventory Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Available Store Stock</label>
                <div className="relative">
                  <input
                    required
                    name="stock"
                    type="number"
                    min="0"
                    placeholder="Stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full border border-gray-200/80 rounded-xl py-3.5 pl-10 pr-4 text-sm font-semibold focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition"
                  />
                  <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-gray-400">
                    <PackageCheck className="w-4 h-4" />
                  </div>
                </div>
              </div>

            </div>

            {/* Product Specifications Description Field block */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Item Specifications & Description</label>
              <div className="relative">
                <textarea
                  required
                  name="description"
                  rows="4"
                  placeholder="Provide precise usage instructions..."
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border border-gray-200/80 rounded-xl py-3.5 pl-10 pr-4 text-sm font-medium leading-relaxed focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition"
                />
                <div className="absolute top-4 left-3.5 pointer-events-none text-gray-400">
                  <FileText className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Split Media Image Field with Live Rendering Feed Box */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 pt-2">
              
              <div className="space-y-1.5 md:col-span-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Thumbnail Cover Image URL</label>
                <div className="relative">
                  <input
                    name="image"
                    type="url"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full border border-gray-200/80 rounded-xl py-3.5 pl-10 pr-4 text-xs font-mono text-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition"
                  />
                  <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-gray-400">
                    <Image className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Cover Feed Window view */}
              <div className="md:col-span-1 flex flex-col items-center justify-center">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 block self-start">Active Thumbnail</span>
                <div className="w-full h-[52px] border border-dashed border-gray-200 rounded-xl bg-gray-50 overflow-hidden flex items-center justify-center text-gray-300">
                  {formData.image ? (
                    <img 
                      src={formData.image} 
                      alt="Thumbnail Snapshot" 
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <span className="text-[10px] font-bold text-gray-400">No Image File</span>
                  )}
                </div>
              </div>

            </div>

            {/* Form submission action controls strip */}
            <div className="pt-4">
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-100 disabled:text-gray-400 text-white font-bold py-4 px-6 rounded-2xl shadow-md shadow-emerald-700/5 hover:shadow-xl hover:shadow-emerald-700/10 transition transform active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Synchronizing Catalog Inventory...
                  </>
                ) : (
                  <>
                    <Edit2 className="w-4 h-4" />
                    Commit Inventory Updates
                  </>
                )}
              </button>
            </div>

          </form>

        </div>
      </div>
    </MainLayout>
  );
}

export default EditProduct;
