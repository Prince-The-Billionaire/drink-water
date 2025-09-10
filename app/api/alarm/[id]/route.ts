import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Alarm from '@/models/Alarm';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  await connectDB();
  const body = await req.json();

  try {
    const { id } = await params;

    const alarm = await Alarm.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );

    if (!alarm) {
      return NextResponse.json({ error: 'Alarm not found' }, { status: 404 });
    }

    return NextResponse.json(alarm);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
