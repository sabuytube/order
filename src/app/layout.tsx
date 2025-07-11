import './globals.css';
import { ReactNode } from 'react';
import Link from 'next/link';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="th">
      <body className="min-h-screen bg-gray-50">
        <nav className="bg-gray-800 text-white">
          <div className="container mx-auto p-4 flex items-center justify-between">
            <Link href="/" className="font-bold text-xl hover:underline">
              ระบบจัดการคำสั่งซื้อ
            </Link>
            <ul className="flex gap-4">
              <li>
                <Link href="/order" className="hover:underline">
                  สร้างใบสั่งซื้อ
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
