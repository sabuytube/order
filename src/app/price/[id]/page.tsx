'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Item {
  name: string;
  unit: string;
  unitPrice?: number;
}

export default function PricePage() {
  const router = useRouter();
  const { id } = useParams();
  const [shopName, setShopName] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const total = items.reduce((sum, item) => sum + (item.unitPrice || 0), 0);

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setShopName(data.shopName);
        setItems(data.items);
      });
  }, [id]);

  const updatePrice = (index: number, value: string) => {
    const price = parseFloat(value);
    const updated = items.map((item, i) =>
      i === index ? { ...item, unitPrice: isNaN(price) ? undefined : price } : item
    );
    setItems(updated);
  };

  const submit = async () => {
    await fetch(`/api/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ shopName, items }),
    });
    // stay on the same page after saving
    router.refresh();
  };

  const clearPrices = async () => {
    const cleared = items.map((item) => ({ ...item, unitPrice: undefined }));
    setItems(cleared);
    await fetch(`/api/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ shopName, items: cleared }),
    });
    router.refresh();
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow p-6 rounded">
      <h1 className="text-2xl font-bold mb-6">กำหนดราคา</h1>
      <table className="w-full mb-2 text-sm">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">ชื่อสินค้า</th>
            <th className="p-2 text-center">หน่วย</th>
            <th className="p-2 text-center">ราคา</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">{item.name}</td>
              <td className="p-2 text-center">{item.unit}</td>
              <td className="p-2 text-center">
                <input
                  type="number"
                  className="border rounded p-1 w-24 text-right"
                  value={item.unitPrice ?? ''}
                  onChange={(e) => updatePrice(index, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2} className="p-2 font-semibold text-right">
              รวม
            </td>
            <td className="p-2 text-center font-semibold">{total}</td>
          </tr>
        </tfoot>
      </table>
      <div className="mt-4 flex justify-between">
        <button className="text-red-600" onClick={clearPrices}>
          ลบราคา
        </button>
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={submit}>
          บันทึก
        </button>
      </div>
    </div>
  );
}
