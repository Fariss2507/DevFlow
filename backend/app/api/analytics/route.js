import { NextResponse } from 'next/server';
import connectDB from '@/src/config/db';
import Task from '@/src/models/Task';
import Bug from '@/src/models/Bug';
import TimeLog from '@/src/models/TimeLog';
import { runAuth } from '@/src/middlewares/auth';

export async function GET(req) {
  try {
    await connectDB();
    const { userId, errorResponse } = runAuth(req);
    if (errorResponse) return errorResponse;

    const tasks = await Task.find({ user: userId });
    const bugs = await Bug.find({ user: userId });
    const logs = await TimeLog.find({ user: userId });

    const tasksCompleted = tasks.filter((t) => t.status === 'Completed').length;
    const bugsFixed = bugs.filter((b) => b.status === 'Fixed' || b.status === 'Closed').length;
    const codingHours = Math.round(logs.reduce((sum, l) => sum + l.duration, 0) / 3600);

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({ year: d.getFullYear(), month: d.getMonth(), label: monthNames[d.getMonth()] });
    }

    const monthlyProgress = months.map((m) => {
      const tasksInMonth = tasks.filter(
        (t) => t.status === 'Completed' &&
          new Date(t.updatedAt).getFullYear() === m.year &&
          new Date(t.updatedAt).getMonth() === m.month
      ).length;
      const bugsInMonth = bugs.filter(
        (b) => (b.status === 'Fixed' || b.status === 'Closed') &&
          new Date(b.updatedAt).getFullYear() === m.year &&
          new Date(b.updatedAt).getMonth() === m.month
      ).length;
      return { month: m.label, tasks: tasksInMonth, bugs: bugsInMonth };
    });

    const monthlyHours = months.map((m) => {
      const hoursInMonth = logs
        .filter(
          (l) => new Date(l.createdAt).getFullYear() === m.year &&
            new Date(l.createdAt).getMonth() === m.month
        )
        .reduce((sum, l) => sum + l.duration, 0) / 3600;
      return { month: m.label, hours: Math.round(hoursInMonth) };
    });

    const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const bugsFixedDaily = dayNames.map((d, idx) => {
      const count = bugs.filter(
        (b) => (b.status === 'Fixed' || b.status === 'Closed') && new Date(b.updatedAt).getDay() === idx
      ).length;
      return { day: d, count };
    });

    return NextResponse.json({ tasksCompleted, bugsFixed, codingHours, monthlyProgress, monthlyHours, bugsFixedDaily });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
