import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '@/src/config/db';
import User from '@/src/models/User';

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '7d' });

    return NextResponse.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
