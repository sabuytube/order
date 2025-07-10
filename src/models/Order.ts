import mongoose, { Schema, Document } from 'mongoose';

type Item = {
  name: string;
  unit: string;
  quantity: number;
  unitPrice?: number;
};

export interface OrderDocument extends Document {
  items: Item[];
}

const ItemSchema = new Schema<Item>({
  name: String,
  unit: String,
  quantity: Number,
  unitPrice: Number,
});

const OrderSchema = new Schema<OrderDocument>({
  items: [ItemSchema],
});

export default mongoose.models.Order || mongoose.model<OrderDocument>('Order', OrderSchema);
