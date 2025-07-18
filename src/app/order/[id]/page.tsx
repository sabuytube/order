'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Item {
  name: string;
  unit: string;
}

export default function EditOrderPage() {
  const router = useRouter();
  const { id } = useParams();
  const [shopName, setShopName] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

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


  const addItem = () => {
    setItems([...items, { name: '', unit: '' }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof Item, value: string) => {
    const updated = items.map((item, i) => (i === index ? { ...item, [field]: value } : item));
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
    router.push(`/summary/${id}`);
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow p-6 rounded relative">
      <h1 className="text-2xl font-bold mb-6">แก้ไขใบสั่งซื้อ</h1>
      <input
        className="border rounded p-2 w-full mb-4"
        placeholder="ชื่อร้าน"
        value={shopName}
        onChange={(e) => setShopName(e.target.value)}
      />
      {items.map((item, index) => (
        <div key={index} className="mb-3 flex gap-2 items-center">
          <div className="flex-1">
            <input
              className="border rounded p-2 w-full"
              placeholder="ชื่อสินค้า"
              value={item.name}
              onChange={(e) => updateItem(index, 'name', e.target.value)}
            />
          </div>
          <input
            className="border rounded p-2 w-24"
            placeholder="หน่วย"
            value={item.unit}
            onChange={(e) => updateItem(index, 'unit', e.target.value)}
          />
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="px-2 bg-red-500 text-white rounded"
          >
            x
          </button>
        </div>
      ))}
      <div className="mt-4 flex justify-end gap-2">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={addItem}
          disabled={loading}
        >
          + เพิ่มรายการ
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={submit}
          disabled={!shopName.trim() || loading}
        >
          บันทึก
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
