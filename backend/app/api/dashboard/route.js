import { NextResponse } from 'next/server';
import connectDB from '@/src/config/db';
import Project from '@/src/models/Project';
import Task from '@/src/models/Task';
import Bug from '@/src/models/Bug';
import Note from '@/src/models/Note';
import TimeLog from '@/src/models/TimeLog';
import { runAuth } from '@/src/middlewares/auth';

export async function GET(req) {
  try {
    await connectDB();
    const { userId, errorResponse } = runAuth(req);
    if (errorResponse) return errorResponse;

    const projects = await Project.find({ user: userId });
    const tasks = await Task.find({ user: userId });
    const bugs = await Bug.find({ user: userId });
    const notes = await Note.find({ user: userId }).sort({ createdAt: -1 }).limit(3);
    const logs = await TimeLog.find({ user: userId });

    const activeProjects = projects.filter((p) => p.status !== 'Completed').length;
    const pendingTasks = tasks.filter((t) => t.status !== 'Completed').length;
    const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
    const openBugs = bugs.filter((b) => b.status === 'Open' || b.status === 'In Progress').length;

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const now = new Date();
    const weeklyProductivity = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const dayStr = d.toISOString().split('T')[0];
      const hours = logs
        .filter((l) => l.date === dayStr)
        .reduce((sum, l) => sum + l.duration, 0) / 3600;
      weeklyProductivity.push({ day: dayNames[d.getDay()], hours: Math.round(hours * 10) / 10 });
    }

    const recentNotes = notes.map((n) => ({
      id: n._id,
      title: n.title,
      date: n.date || n.createdAt.toISOString().split('T')[0],
    }));

    return NextResponse.json({
      stats: [
        { id: 1, label: 'Active Projects', value: activeProjects, icon: '📁' },
        { id: 2, label: 'Pending Tasks', value: pendingTasks, icon: '📝' },
        { id: 3, label: 'Completed Tasks', value: completedTasks, icon: '✅' },
        { id: 4, label: 'Open Bugs', value: openBugs, icon: '🐞' },
      ],
      weeklyProductivity,
      recentNotes,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
