'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Order {
  _id: string;
  items: { name: string; unit: string; quantity: number }[];
}

export default function HistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white shadow p-6 rounded">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      <table className="w-full border text-sm">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Order ID</th>
            <th className="p-2 text-center">Items</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-b">
              <td className="p-2">{order._id}</td>
              <td className="p-2 text-center">{order.items.length}</td>
              <td className="p-2 text-center">
                <Link href={`/summary/${order._id}`} className="text-blue-600 hover:underline">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
