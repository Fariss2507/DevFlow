import { NextResponse } from 'next/server';
import connectDB from '@/src/config/db';
import Notification from '@/src/models/Notification';
import { runAuth } from '@/src/middlewares/auth';

export async function DELETE(req) {
  try {
    await connectDB();
    const { userId, errorResponse } = runAuth(req);
    if (errorResponse) return errorResponse;

    await Notification.deleteMany({ user: userId });
    return NextResponse.json({ message: 'All notifications cleared' });
  } catch (err) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
