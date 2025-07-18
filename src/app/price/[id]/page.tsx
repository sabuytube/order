'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Item {
  name: string;
  unit: string;
  unitPrice?: number;
  comment?: string;
}

export default function PricePage() {
  const router = useRouter();
  const { id } = useParams();
  const [shopName, setShopName] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const total = items.reduce((sum, item) => sum + (item.unitPrice || 0), 0);

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setShopName(data.shopName);
        setItems(data.items);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const updatePrice = (index: number, value: string) => {
    const price = parseFloat(value);
    const updated = items.map((item, i) =>
      i === index ? { ...item, unitPrice: isNaN(price) ? undefined : price } : item
    );
    setItems(updated);
  };

  const updateComment = (index: number, value: string) => {
    const updated = items.map((item, i) =>
      i === index ? { ...item, comment: value } : item
    );
    setItems(updated);
  };

  const submit = async () => {
    if (loading) return;
    setLoading(true);
    await fetch(`/api/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ shopName, items }),
    });
    // refresh the page after saving so data is up to date
    router.refresh();
    // force reload as well
    window.location.reload();
  };

  const clearPrices = async () => {
    if (loading) return;
    setLoading(true);
    const cleared = items.map((item) => ({
      ...item,
      unitPrice: undefined,
      comment: '',
    }));
    setItems(cleared);
    await fetch(`/api/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ shopName, items: cleared }),
    });
    router.refresh();
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow p-6 rounded relative">
      <h1 className="text-2xl font-bold">กำหนดราคา (သတ်မှတ်ဈေး)</h1>
      <p className="mb-6">หมายเหตุ โล:ကီလို, ลูก:လုံး, หัว:ထောင်, กำ:ည</p>
      <table className="w-full mb-2 text-sm">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">ชื่อสินค้า</th>
            <th className="p-2 text-center">หน่วย</th>
            <th className="p-2 text-center">comment</th>
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
                  type="text"
                  className="border rounded p-1 w-24"
                  value={item.comment ?? ''}
                  onChange={(e) => updateComment(index, e.target.value)}
                />
              </td>
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
            <td colSpan={3} className="p-2 font-semibold text-right">
              รวม
            </td>
            <td className="p-2 text-center font-semibold">{total}</td>
          </tr>
        </tfoot>
      </table>
      <div className="mt-4 flex justify-between">
        <button
          className="text-red-600 hidden disabled:opacity-50"
          onClick={clearPrices}
          disabled={loading}
        >
          clear
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={submit}
          disabled={loading}
        >
          บันทึกราคา
        </button>
      </div>
      {loading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
          <div className="bg-white p-4 rounded shadow text-lg">Loading...</div>
        </div>
      )}
    </div>
  );
}
