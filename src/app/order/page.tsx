'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Item {
  name: string;
  unit: string;
}

export default function OrderPage() {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([{ name: '', unit: '' }]);
  const [products, setProducts] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data.map((p: { name: string }) => p.name)));
  }, []);

  const addProduct = async () => {
    const name = prompt('ชื่อสินค้า');
    if (!name) return;
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    setProducts((prev) => [...prev, name]);
  };

  const addItem = () => {
    setItems([...items, { name: '', unit: '' }]);
  };

  const updateItem = (index: number, field: keyof Item, value: string) => {
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
    <div className="max-w-xl mx-auto bg-white shadow p-6 rounded">
      <h1 className="text-2xl font-bold mb-6">สร้างใบสั่งซื้อ</h1>
      {items.map((item, index) => (
        <div key={index} className="mb-3 flex gap-2 items-center">
          <div className="flex-1 relative">
            <input
              list={`products-${index}`}
              className="border rounded p-2 w-full"
              placeholder="ชื่อสินค้า"
              value={item.name}
              onChange={(e) => updateItem(index, 'name', e.target.value)}
            />
            <datalist id={`products-${index}`}>
              {products.map((p) => (
                <option key={p} value={p} />
              ))}
            </datalist>
          </div>
          <button
            type="button"
            onClick={addProduct}
            className="px-2 bg-gray-200 rounded"
          >
            +
          </button>
          <input
            className="border rounded p-2 w-24"
            placeholder="หน่วย"
            value={item.unit}
            onChange={(e) => updateItem(index, 'unit', e.target.value)}
          />
        </div>
      ))}
      <div className="mt-4 flex justify-end gap-2">
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={addItem}>
          + เพิ่มรายการ
        </button>
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={submit}>
          ส่งใบสั่งซื้อ
        </button>
      </div>
    </div>
  );
}
