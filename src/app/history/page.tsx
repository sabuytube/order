'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Order {
  _id: string;
  items: { name: string; unit: string; quantity: number }[];
  shopName: string;
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
      <h1 className="text-2xl font-bold mb-6">ประวัติการสั่งซื้อ</h1>
      <div className="mb-4 text-right">
        <Link
          href="/order"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          สร้างใบสั่งซื้อ
        </Link>
      </div>
      <div className="grid gap-4">
        {orders.map((order) => (
          <div key={order._id} className="border rounded p-4">
            <div className="font-semibold">{order.shopName}</div>
            <div className="text-sm text-gray-500">รหัส: {order._id}</div>
            <div className="text-sm mb-2">จำนวนรายการ {order.items.length}</div>
            <div className="space-x-2">
              <Link href={`/summary/${order._id}`} className="text-blue-600 hover:underline">
                ดู
              </Link>
              <Link href={`/order/${order._id}`} className="text-green-600 hover:underline">
                แก้ไข
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
