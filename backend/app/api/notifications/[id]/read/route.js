import { NextResponse } from 'next/server';
import connectDB from '@/src/config/db';
import Notification from '@/src/models/Notification';
import { runAuth } from '@/src/middlewares/auth';

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { userId, errorResponse } = runAuth(req);
    if (errorResponse) return errorResponse;

    const { id } = params;

    const updated = await Notification.findOneAndUpdate(
      { _id: id, user: userId },
      { read: true },
      { new: true }
    );
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
