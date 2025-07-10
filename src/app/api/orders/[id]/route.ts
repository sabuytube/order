import { NextResponse } from 'next/server';
import Order from '@/models/Order';
import { connectDB } from '@/lib/mongodb';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const order = await Order.findById(params.id);
  return NextResponse.json(order);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const data = await req.json();
  const order = await Order.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(order);
}
