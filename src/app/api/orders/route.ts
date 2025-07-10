import { NextResponse } from 'next/server';
import Order from '@/models/Order';
import { connectDB } from '@/lib/mongodb';

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const order = await Order.create(data);
  return NextResponse.json({ id: order._id });
}

export async function GET() {
  await connectDB();
  const orders = await Order.find();
  return NextResponse.json(orders);
}
