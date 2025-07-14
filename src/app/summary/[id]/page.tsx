'use client';
import { useEffect, useState } from 'react';
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
  const [shopName, setShopName] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setShopName(data.shopName);
        setItems(data.items);
      });
  }, [id]);


  useEffect(() => {
    if (items.length > 0 && !imageUrl) {
      const element = document.getElementById('summary');
      if (!element) return;
      html2canvas(element).then((canvas) => {
        setImageUrl(canvas.toDataURL('image/png'));
      });
    }
  }, [items, imageUrl]);

  return (
    <div className="max-w-2xl mx-auto bg-white shadow p-6 rounded">
      <h1 className="text-2xl font-bold mb-6">สรุปคำสั่งซื้อ</h1>
      {imageUrl && (
        <div className="mb-4">
          <img src={imageUrl} alt="สรุปคำสั่งซื้อ" className="w-full border" />
        </div>
      )}
      <div id="summary" className={imageUrl ? 'hidden' : ''}>
        <table className="w-full mb-4 border text-sm border-collapse">
          <caption className="p-2 font-semibold text-center">{shopName}</caption>
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
                <td className="p-2 text-center">{item.unitPrice ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
