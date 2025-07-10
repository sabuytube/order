import './globals.css';
import { ReactNode } from 'react';
import Link from 'next/link';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <nav className="bg-gray-800 text-white">
          <div className="container mx-auto p-4 flex items-center justify-between">
            <div className="font-bold text-xl">Market Order</div>
            <ul className="flex gap-4">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/order" className="hover:underline">
                  Create Order
                </Link>
              </li>
              <li>
                <Link href="/history" className="hover:underline">
                  History
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
