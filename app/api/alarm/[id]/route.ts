import { NextResponse } from "next/server";
import {connectDB} from "@/lib/mongodb";
import Alarm from "@/models/Alarm";

export async function PATCH(
  req: Request,
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
    return NextResponse.json(alarm);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
