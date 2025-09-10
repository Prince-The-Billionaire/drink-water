import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/mongodb";
import Alarm from "@/models/Alarm";

// Create alarm
export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, time, isOn } = await req.json();
  await connectDB();

  const alarm = await Alarm.create({ user: userId, name, time, isOn });
  return NextResponse.json(alarm);
}

// Get all alarms
export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const alarms = await Alarm.find({ user: userId });

  return NextResponse.json(alarms);
}

// Update alarm (PUT)
export async function PUT(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, updates } = await req.json();
  await connectDB();

  const updated = await Alarm.findOneAndUpdate({ _id: id, user: userId }, updates, { new: true });
  return NextResponse.json(updated);
}

// Delete alarm
export async function DELETE(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  await connectDB();

  await Alarm.findOneAndDelete({ _id: id, user: userId });
  return NextResponse.json({ message: "Alarm deleted" });
}
