// models/Habit.ts
import mongoose, { Schema, Document } from "mongoose";

interface IHabit extends Document {
  user: string;
  firstIntakeTime?: Date;
  maxLimit: number; // ml
  averageDrinkSize: number; // ml
}

const HabitSchema = new Schema<IHabit>({
  user: { type: String, required: true },
  firstIntakeTime: { type: Date },
  maxLimit: { type: Number, default: 2000 }, // daily goal
  averageDrinkSize: { type: Number, default: 250 },
});

export default mongoose.models.Habit || mongoose.model<IHabit>("Habit", HabitSchema);
