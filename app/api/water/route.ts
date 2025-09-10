import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/mongodb";
import Water from "@/models/Water";

// Create water entry
export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { value } = await req.json();
  await connectDB();

  const entry = await Water.create({
    user: userId,
    day: new Date().toLocaleDateString("en-US", { weekday: "long" }),
    date: new Date(),
    value,
  });

  return NextResponse.json(entry);
}

// Get all water entries for user
export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const entries = await Water.find({ user: userId }).sort({ date: -1 });

  return NextResponse.json(entries);
}

// Delete all entries (optional cleanup)
export async function DELETE() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  await Water.deleteMany({ user: userId });

  return NextResponse.json({ message: "All water entries deleted" });
}
