import { NextResponse } from 'next/server';
import connectDB from '@/src/config/db';
import Notification from '@/src/models/Notification';
import { runAuth } from '@/src/middlewares/auth';

export async function PUT(req) {
  try {
    await connectDB();
    const { userId, errorResponse } = runAuth(req);
    if (errorResponse) return errorResponse;

    await Notification.updateMany({ user: userId }, { read: true });
    return NextResponse.json({ message: 'All marked as read' });
  } catch (err) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
