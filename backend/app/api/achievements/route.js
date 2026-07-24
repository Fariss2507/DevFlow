import { NextResponse } from 'next/server';
import connectDB from '@/src/config/db';
import Achievement from '@/src/models/Achievement';
import { runAuth } from '@/src/middlewares/auth';

export async function GET(req) {
  try {
    await connectDB();
    const { userId, errorResponse } = runAuth(req);
    if (errorResponse) return errorResponse;

    let achievements = await Achievement.find({ user: userId });

    if (achievements.length === 0) {
      achievements = await Achievement.insertMany([
        { user: userId, title: 'First Project', description: 'Created your first DevForge project', icon: '🚀', unlocked: true, progress: 100, maxProgress: 100 },
        { user: userId, title: 'Task Master', description: 'Complete 100 tasks', icon: '✅', unlocked: false, progress: 42, maxProgress: 100 },
        { user: userId, title: 'Bug Hunter', description: 'Fix 25 critical bugs', icon: '🐞', unlocked: true, progress: 25, maxProgress: 25 },
        { user: userId, title: 'AI Power User', description: 'Run 50 AI prompts', icon: '⚡', unlocked: true, progress: 50, maxProgress: 50 },
        { user: userId, title: 'Documentation Master', description: 'Write 10 full system docs', icon: '📚', unlocked: false, progress: 6, maxProgress: 10 },
        { user: userId, title: 'Productivity Streak', description: 'Log coding time 7 days in a row', icon: '🔥', unlocked: true, progress: 7, maxProgress: 7 },
      ]);
    }

    return NextResponse.json(achievements);
  } catch (err) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
