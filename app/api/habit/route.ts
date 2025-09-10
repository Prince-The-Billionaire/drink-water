import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/mongodb";
import Habit from "@/models/Habits";

// Create or initialize habit
export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { maxLimit, averageDrinkSize, firstIntakeTime } = await req.json();
  await connectDB();

  const habit = await Habit.findOneAndUpdate(
    { user: userId },
    { maxLimit, averageDrinkSize, firstIntakeTime },
    { new: true, upsert: true }
  );

  return NextResponse.json(habit);
}

// Get habit data
export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const habit = await Habit.findOne({ user: userId });

  return NextResponse.json(habit);
}

// Update habit data
export async function PUT(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const updates = await req.json();
  await connectDB();

  const habit = await Habit.findOneAndUpdate({ user: userId }, updates, { new: true });
  return NextResponse.json(habit);
}
