import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import DetectDisease from "./pages/DetectDisease";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/detect" element={<DetectDisease />} />
    </Routes>
  );
}

export default App;
