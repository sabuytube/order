'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Order {
  _id: string;
  shopName: string;
  items: { name: string; unit: string; quantity: number }[];
}

export default function HomePage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div className="mt-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">ระบบจัดการคำสั่งซื้อ</h1>
      <p className="mb-6 text-gray-600 text-center">
        สร้างและจัดการคำสั่งซื้อได้ง่ายๆ
      </p>
      <div className="text-center mb-6">
        <Link
          href="/order"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          สร้างใบสั่งซื้อ
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {orders.map((order) => (
          <Link
            key={order._id}
            href={`/summary/${order._id}`}
            className="border rounded p-4 hover:bg-gray-50"
          >
            <div className="font-semibold">{order.shopName}</div>
            <div className="text-sm text-gray-500">
              จำนวนรายการ {order.items.length}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
