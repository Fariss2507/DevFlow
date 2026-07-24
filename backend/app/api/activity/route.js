import { NextResponse } from 'next/server';
import connectDB from '@/src/config/db';
import Activity from '@/src/models/Activity';
import { runAuth } from '@/src/middlewares/auth';

export async function GET(req) {
  try {
    await connectDB();
    const { userId, errorResponse } = runAuth(req);
    if (errorResponse) return errorResponse;

    let activities = await Activity.find({ user: userId }).sort({ createdAt: -1 }).limit(30);

    if (activities.length === 0) {
      activities = await Activity.insertMany([
        { user: userId, action: 'Created Project', details: 'Initialized DevForge AI Workspace', category: 'project' },
        { user: userId, action: 'Completed Task', details: 'Migrated API from Node to Next.js', category: 'task' },
        { user: userId, action: 'Fixed Bug', details: 'Resolved CORS preflight response headers', category: 'bug' },
        { user: userId, action: 'Generated AI', details: 'Ran AI Mongo Query Generator', category: 'ai' },
      ]);
    }

    return NextResponse.json(activities);
  } catch (err) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
