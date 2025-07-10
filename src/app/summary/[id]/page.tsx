'use client';
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import html2canvas from 'html2canvas';

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

  const exportImage = useCallback(async () => {
    const element = document.getElementById('summary');
    if (!element || !('clipboard' in navigator)) return;
    const canvas = await html2canvas(element);
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }) as any,
      ]);
    });
  }, [id]);

  return (
    <div className="max-w-2xl mx-auto bg-white shadow p-6 rounded">
      <h1 className="text-2xl font-bold mb-6">สรุปคำสั่งซื้อ</h1>
      <div id="summary">
        <table className="w-full mb-4 border text-sm">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">ชื่อสินค้า</th>
              <th className="p-2">หน่วย</th>
              <th className="p-2">ราคา</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{item.name}</td>
                <td className="p-2 text-center">{item.unit}</td>
                <td className="p-2 text-center"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end">
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={exportImage}>
          คัดลอกรูปภาพ
        </button>
      </div>
    </div>
  );
}
