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

  const remove = async (id: string) => {
    await fetch(`/api/orders/${id}`, { method: 'DELETE' });
    setOrders((prev) => prev.filter((o) => o._id !== id));
  };

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
      <table className="w-full border text-sm">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">รหัสคำสั่งซื้อ</th>
            <th className="p-2 text-center">จำนวนรายการ</th>
            <th className="p-2 text-center">การจัดการ</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-b">
              <td className="p-2">{order._id}</td>
              <td className="p-2 text-center">{order.items.length}</td>
              <td className="p-2 text-center space-x-2">
                <Link href={`/summary/${order._id}`} className="text-blue-600 hover:underline">
                  ดู
                </Link>
                <Link href={`/order/${order._id}`} className="text-green-600 hover:underline">
                  แก้ไข
                </Link>
                <button onClick={() => remove(order._id)} className="text-red-600 hover:underline">
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
