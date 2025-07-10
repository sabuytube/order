'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import html2pdf from 'html2pdf.js';

interface Item {
  name: string;
  unit: string;
  quantity: number;
  unitPrice?: number;
}

export default function SummaryPage() {
  const { id } = useParams();
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then((res) => res.json())
      .then((data) => setItems(data.items));
  }, [id]);

  const updatePrice = (index: number, value: number) => {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, unitPrice: value } : item)));
  };

  const save = async () => {
    await fetch(`/api/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    });
  };

  const exportPDF = () => {
    const element = document.getElementById('summary');
    if (!element) return;
    html2pdf().from(element).save(`order-${id}.pdf`);
  };

  const total = items.reduce((sum, item) => sum + (item.unitPrice || 0) * item.quantity, 0);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Order Summary</h1>
      <div id="summary">
        <table className="w-full mb-4 border">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Name</th>
              <th className="p-2">Unit</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Unit Price</th>
              <th className="p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{item.name}</td>
                <td className="p-2 text-center">{item.unit}</td>
                <td className="p-2 text-center">{item.quantity}</td>
                <td className="p-2 text-center">
                  <input
                    type="number"
                    className="border p-1 w-24"
                    value={item.unitPrice || ''}
                    onChange={(e) => updatePrice(index, Number(e.target.value))}
                  />
                </td>
                <td className="p-2 text-right">
                  {((item.unitPrice || 0) * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-right font-bold mb-4">Total: {total.toFixed(2)}</div>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 mr-2" onClick={save}>Save Prices</button>
      <button className="bg-green-500 text-white px-4 py-2" onClick={exportPDF}>Export PDF</button>
    </div>
  );
}
