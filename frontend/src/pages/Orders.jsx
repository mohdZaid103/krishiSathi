import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getMyOrders } from "../services/orderService.js";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getMyOrders();
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-8">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow">
            No orders yet
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white p-6 rounded-xl shadow"
              >
                <p>
                  <strong>Order ID:</strong>{" "}
                  {order._id}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {order.status}
                </p>

                <p>
                  <strong>Total:</strong> ₹
                  {order.totalAmount}
                </p>

                <p>
                  <strong>Items:</strong>{" "}
                  {order.items.length}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default Orders;