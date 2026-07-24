import { NextResponse } from 'next/server';
import connectDB from '@/src/config/db';
import Notification from '@/src/models/Notification';
import { runAuth } from '@/src/middlewares/auth';

export async function GET(req) {
  try {
    await connectDB();
    const { userId, errorResponse } = runAuth(req);
    if (errorResponse) return errorResponse;

    const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });
    return NextResponse.json(notifications);
  } catch (err) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
