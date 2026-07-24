import { NextResponse } from 'next/server';
import connectDB from '@/src/config/db';
import Bug from '@/src/models/Bug';
import { runAuth } from '@/src/middlewares/auth';

export async function GET(req) {
  try {
    await connectDB();
    const { userId, errorResponse } = runAuth(req);
    if (errorResponse) return errorResponse;

    const items = await Bug.find({ user: userId });
    return NextResponse.json(items);
  } catch (err) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const { userId, errorResponse } = runAuth(req);
    if (errorResponse) return errorResponse;

    const body = await req.json();
    const newItem = new Bug({ ...body, user: userId });
    await newItem.save();
    return NextResponse.json(newItem, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
