'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import html2canvas from 'html2canvas';

interface Item {
  name: string;
  unit: string;
  quantity: number;
  unitPrice?: number;
  comment?: string;
}

export default function SummaryPage() {
  const { id } = useParams();
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [shopName, setShopName] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const total = items.reduce(
    (sum, item) => sum + ((item.unitPrice || 0) * (item.quantity || 1)),
    0
  );

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
    // force reload so the screenshot reflects cleared prices
    window.location.reload();
  };

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
    <div className="max-w-2xl mx-auto bg-white shadow p-6 rounded relative">
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
              <th className="p-2 text-center">ลำดับ</th>
              <th className="p-2 text-left">ชื่อสินค้า</th>
              <th className="p-2">หน่วย</th>
              <th className="p-2">comment</th>
              <th className="p-2">ราคา</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{`${index + 1}. ${item.name}`}</td>
                <td className="p-2 text-center">{item.unit}</td>
                <td className="p-2 text-center">{item.comment ?? ''}</td>
                <td className="p-2 text-center">{item.unitPrice ?? ''}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} className="p-2 font-semibold text-right">รวม</td>
              <td className="p-2 text-center font-semibold">{total}</td>
            </tr>
          </tfoot>
        </table>
        </div>
        <div className="mt-4 flex justify-between">
          <button
            className="text-red-600 disabled:opacity-50"
            onClick={clearPrices}
            disabled={loading}
          >
            clear
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
