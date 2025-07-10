import mongoose, { Schema, Document } from 'mongoose';

export interface ProductDocument extends Document {
  name: string;
}

const ProductSchema = new Schema<ProductDocument>({
  name: { type: String, required: true },
});

export default mongoose.models.Product || mongoose.model<ProductDocument>('Product', ProductSchema);
