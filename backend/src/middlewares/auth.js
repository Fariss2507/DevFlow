import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export function runAuth(req) {
  const authHeader = req.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { errorResponse: NextResponse.json({ message: 'No token provided' }, { status: 401 }) };
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    return { userId: decoded.id };
  } catch (err) {
    return { errorResponse: NextResponse.json({ message: 'Invalid token' }, { status: 401 }) };
  }
}
