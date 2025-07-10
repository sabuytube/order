'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Item {
  name: string;
  unit: string;
  quantity: number;
}

export default function OrderPage() {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([{ name: '', unit: '', quantity: 1 }]);

  const addItem = () => {
    setItems([...items, { name: '', unit: '', quantity: 1 }]);
  };

  const updateItem = (index: number, field: keyof Item, value: string | number) => {
    const updated = items.map((item, i) => (i === index ? { ...item, [field]: value } : item));
    setItems(updated);
  };

  const submit = async () => {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    });
    const data = await res.json();
    router.push(`/summary/${data.id}`);
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Create Order</h1>
      {items.map((item, index) => (
        <div key={index} className="mb-2 flex gap-2">
          <input
            className="border p-1"
            placeholder="Name"
            value={item.name}
            onChange={(e) => updateItem(index, 'name', e.target.value)}
          />
          <input
            className="border p-1"
            placeholder="Unit"
            value={item.unit}
            onChange={(e) => updateItem(index, 'unit', e.target.value)}
          />
          <input
            type="number"
            className="border p-1 w-20"
            value={item.quantity}
            onChange={(e) => updateItem(index, 'quantity', Number(e.target.value))}
          />
        </div>
      ))}
      <button className="bg-blue-500 text-white px-4 py-2 mr-2" onClick={addItem}>Add Item</button>
      <button className="bg-green-500 text-white px-4 py-2" onClick={submit}>Submit Order</button>
    </div>
  );
}
