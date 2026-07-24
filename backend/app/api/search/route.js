import { NextResponse } from 'next/server';
import connectDB from '@/src/config/db';
import Project from '@/src/models/Project';
import Task from '@/src/models/Task';
import Bug from '@/src/models/Bug';
import Note from '@/src/models/Note';
import Snippet from '@/src/models/Snippet';
import { runAuth } from '@/src/middlewares/auth';

export async function GET(req) {
  try {
    await connectDB();
    const { userId, errorResponse } = runAuth(req);
    if (errorResponse) return errorResponse;

    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q') || '';
    if (!q.trim()) return NextResponse.json([]);

    const regex = new RegExp(q, 'i');

    const [projects, tasks, bugs, notes, snippets] = await Promise.all([
      Project.find({ user: userId, $or: [{ name: regex }, { description: regex }] }),
      Task.find({ user: userId, $or: [{ title: regex }, { description: regex }] }),
      Bug.find({ user: userId, $or: [{ title: regex }, { description: regex }] }),
      Note.find({ user: userId, $or: [{ title: regex }, { content: regex }] }),
      Snippet.find({ user: userId, $or: [{ title: regex }, { tags: regex }] }),
    ]);

    const results = [
      ...projects.map((p) => ({ type: 'Project', title: p.name, subtitle: p.status, link: '/projects', id: p._id })),
      ...tasks.map((t) => ({ type: 'Task', title: t.title, subtitle: t.status, link: '/tasks', id: t._id })),
      ...bugs.map((b) => ({ type: 'Bug', title: b.title, subtitle: b.severity, link: '/bugs', id: b._id })),
      ...notes.map((n) => ({ type: 'Note', title: n.title, subtitle: n.category, link: '/notes', id: n._id })),
      ...snippets.map((s) => ({ type: 'Snippet', title: s.title, subtitle: s.language, link: '/snippets', id: s._id })),
    ];

    return NextResponse.json(results);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
