import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '@/src/config/db';
import User from '@/src/models/User';

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'Email already registered' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '7d' });

    return NextResponse.json({
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
