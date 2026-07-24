import { NextResponse } from 'next/server';
import connectDB from '@/src/config/db';
import Doc from '@/src/models/Doc';
import { runAuth } from '@/src/middlewares/auth';

export async function GET(req) {
  try {
    await connectDB();
    const { userId, errorResponse } = runAuth(req);
    if (errorResponse) return errorResponse;

    let docs = await Doc.find({ user: userId }).sort({ updatedAt: -1 });

    if (docs.length === 0) {
      docs = await Doc.insertMany([
        {
          user: userId,
          title: 'System Architecture Specification',
          content: '# System Architecture\n\nDevForge AI utilizes a Next.js App Router API backend with a high-performance React client.\n\n## Tech Stack\n- React 19\n- Next.js 14\n- MongoDB Atlas & Mongoose\n- Tailwind CSS & Custom Glassmorphism Theme',
          versionHistory: [{ version: 1, content: 'Initial draft of architecture' }]
        },
        {
          user: userId,
          title: 'API Authentication Guidelines',
          content: '# Authentication Standard\n\nAll endpoints require a Bearer JWT passed in the HTTP `Authorization` header.\n\n```bash\nAuthorization: Bearer <jwt_token>\n```',
          versionHistory: [{ version: 1, content: 'Initial auth specs' }]
        }
      ]);
    }

    return NextResponse.json(docs);
  } catch (err) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const { userId, errorResponse } = runAuth(req);
    if (errorResponse) return errorResponse;

    const { title, content } = await req.json();
    const newDoc = new Doc({
      user: userId,
      title,
      content,
      versionHistory: [{ version: 1, content }]
    });
    await newDoc.save();

    return NextResponse.json(newDoc, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
