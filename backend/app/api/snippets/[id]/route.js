import { NextResponse } from 'next/server';
import connectDB from '@/src/config/db';
import Snippet from '@/src/models/Snippet';
import { runAuth } from '@/src/middlewares/auth';

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { userId, errorResponse } = runAuth(req);
    if (errorResponse) return errorResponse;

    const { id } = params;
    const body = await req.json();

    const updated = await Snippet.findOneAndUpdate(
      { _id: id, user: userId },
      body,
      { new: true }
    );
    
    if (!updated) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { userId, errorResponse } = runAuth(req);
    if (errorResponse) return errorResponse;

    const { id } = params;

    const deleted = await Snippet.findOneAndDelete({ _id: id, user: userId });
    
    if (!deleted) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Deleted' });
  } catch (err) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
