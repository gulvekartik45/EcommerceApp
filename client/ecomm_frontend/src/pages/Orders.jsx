import { useEffect, useState } from "react";
import { getMyOrders } from "../api/apis";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getMyOrders().then(setOrders);
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.map((o) => (
        <div key={o._id} className="border p-4 mb-4 rounded">
          <p>Total: ₹{o.totalAmount}</p>
          <p>Status: {o.status}</p>
          <p>Date: {new Date(o.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
