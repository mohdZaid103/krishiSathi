import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import DetectDisease from "./pages/DetectDisease";
import DetectionHistory from "./pages/DetectionHistory";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import OrderDetails from "./pages/OrderDetails";
import { CartProvider } from "./context/CartContext";
import SellerDashboard from "./pages/SellerDashboard";
import AddProduct from "./pages/AddProduct";
import SellerOrders from "./pages/SellerOrders";
import EditProduct from "./pages/EditProduct";
import SellerRoute from "./routes/SellerRoute";
function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/detect" element={<DetectDisease />} />
        <Route path="/history" element={<DetectionHistory />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/seller/orders" element={<SellerOrders />} />
        <Route path="/seller" element={<SellerDashboard />} />

        <Route path="/seller/add-product" element={<AddProduct />} />
  
        <Route
          path="/seller"
          element={
            <SellerRoute>
              <SellerDashboard />
            </SellerRoute>
          }
        />

        <Route
          path="/seller/add-product"
          element={
            <SellerRoute>
              <AddProduct />
            </SellerRoute>
          }
        />

        <Route
          path="/seller/orders"
          element={
            <SellerRoute>
              <SellerOrders />
            </SellerRoute>
          }
        />
        <Route path="/seller/edit/:id" element={<EditProduct />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
