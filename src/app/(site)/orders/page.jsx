"use client";
import { useEffect, useState } from "react";
import { getOrderAction } from "../../../action/order.action";
import OrderCardComponent from "../../../components/orders/OrderCardComponent";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrderAction();
        setOrders(res?.payload || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-6 py-10 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Ordered products</h1>
        <p className="text-gray-400 text-sm mt-1">
          {orders.length} order{orders.length !== 1 ? "s" : ""} from your account.
        </p>
      </div>
      <div className="flex flex-col gap-6">
        {orders.length === 0 ? (
          <div className="border border-gray-200 rounded-xl p-10 text-center text-gray-400 text-sm">
            No orders yet.
          </div>
        ) : (
          orders.map((order) => (
            <OrderCardComponent key={order.orderId} order={order} />
          ))
        )}
      </div>
    </div>
  );
}