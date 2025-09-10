// models/Alarm.ts
import mongoose, { Schema, Document } from "mongoose";

interface IAlarm extends Document {
  user: string;
  name: string;
  time: string; // e.g. "08:30"
  isOn: boolean;
}

const AlarmSchema = new Schema<IAlarm>({
  user: { type: String, required: true },
  name: { type: String, required: true },
  time: { type: String, required: true },
  isOn: { type: Boolean, default: true },
});

export default mongoose.models.Alarm || mongoose.model<IAlarm>("Alarm", AlarmSchema);
