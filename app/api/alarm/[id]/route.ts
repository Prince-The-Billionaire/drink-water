import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Alarm from "@/models/Alarm";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const body = await req.json();

  try {
    const alarm = await Alarm.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true }
    );

    if (!alarm) {
      return NextResponse.json({ error: "Alarm not found" }, { status: 404 });
    }

    return NextResponse.json(alarm);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
