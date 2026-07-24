import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '@/src/config/db';
import User from '@/src/models/User';

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json().catch(() => ({}));
    const email = body.email || 'developer.google@gmail.com';
    const name = body.name || 'Google Developer';

    let user = await User.findOne({ email });

    if (!user) {
      const hashedPassword = await bcrypt.hash(`google_${Date.now()}_secret`, 10);
      user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '7d' });

    return NextResponse.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error('Google Auth Error:', err);
    return NextResponse.json({ message: 'Google authentication failed' }, { status: 500 });
  }
}
