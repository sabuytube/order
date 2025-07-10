import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold mb-4">ระบบจัดการคำสั่งซื้อ</h1>
      <p className="mb-6 text-gray-600">สร้างและจัดการคำสั่งซื้อได้อย่างง่ายดาย</p>
      <Link
        href="/order"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
      >
        สร้างใบสั่งซื้อ
      </Link>
      <Link
        href="/history"
        className="inline-block bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700 ml-4"
      >
        ดูประวัติคำสั่งซื้อ
      </Link>
    </div>
  );
}
