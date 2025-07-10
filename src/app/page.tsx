import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold mb-4">Market Order System</h1>
      <p className="mb-6 text-gray-600">Create and manage market orders easily.</p>
      <Link
        href="/order"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
      >
        Create Order
      </Link>
      <Link
        href="/history"
        className="inline-block bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700 ml-4"
      >
        View History
      </Link>
    </div>
  );
}
