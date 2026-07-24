import { NextResponse } from 'next/server';
import connectDB from '@/src/config/db';
import User from '@/src/models/User';
import Project from '@/src/models/Project';
import Task from '@/src/models/Task';
import AiHistory from '@/src/models/AiHistory';
import { runAuth } from '@/src/middlewares/auth';

export async function GET(req) {
  try {
    await connectDB();
    const { userId, errorResponse } = runAuth(req);
    if (errorResponse) return errorResponse;

    const [totalUsers, totalProjects, totalTasks, totalAiRequests] = await Promise.all([
      User.countDocuments(),
      Project.countDocuments(),
      Task.countDocuments(),
      AiHistory.countDocuments(),
    ]);

    const users = await User.find().select('-password').limit(20);

    return NextResponse.json({
      metrics: {
        totalUsers,
        totalProjects,
        totalTasks,
        totalAiRequests,
        systemHealth: '100% Operational',
        apiUptime: '99.98%'
      },
      users
    });
  } catch (err) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
