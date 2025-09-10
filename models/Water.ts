// models/Water.ts
import mongoose, { Schema, Document } from "mongoose";

interface IWater extends Document {
  user: string;
  day: string;
  date: Date;
  value: number; // in ml
}

const WaterSchema = new Schema<IWater>({
  user: { type: String, required: true },
  day: { type: String, required: true },
  date: { type: Date, required: true },
  value: { type: Number, required: true },
});

export default mongoose.models.Water || mongoose.model<IWater>("Water", WaterSchema);
