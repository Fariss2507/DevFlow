import { NextResponse } from 'next/server';
import connectDB from '@/src/config/db';
import User from '@/src/models/User';
import { runAuth } from '@/src/middlewares/auth';

export async function GET(req) {
  try {
    await connectDB();
    
    const { userId, errorResponse } = runAuth(req);
    if (errorResponse) return errorResponse;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json(user);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
