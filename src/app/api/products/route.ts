import { NextResponse } from 'next/server';
import Product from '@/models/Product';
import { connectDB } from '@/lib/mongodb';

export async function GET() {
  await connectDB();
  const products = await Product.find().sort({ name: 1 });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const product = await Product.create(data);
  return NextResponse.json(product);
}
