import mongoose, { Schema, Document } from 'mongoose';

type Item = {
  name: string;
  unit: string;
  quantity: number;
  unitPrice?: number;
};

export interface OrderDocument extends Document {
  shopName: string;
  items: Item[];
}

const ItemSchema = new Schema<Item>({
  name: String,
  unit: String,
  quantity: Number,
  unitPrice: Number,
});

const OrderSchema = new Schema<OrderDocument>({
  shopName: { type: String, required: true },
  items: [ItemSchema],
});

export default mongoose.models.Order || mongoose.model<OrderDocument>('Order', OrderSchema);
