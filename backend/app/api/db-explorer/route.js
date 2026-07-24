import { NextResponse } from 'next/server';
import connectDB from '@/src/config/db';
import User from '@/src/models/User';
import Project from '@/src/models/Project';
import Task from '@/src/models/Task';
import Bug from '@/src/models/Bug';
import Note from '@/src/models/Note';
import Snippet from '@/src/models/Snippet';
import FileModel from '@/src/models/File';
import { runAuth } from '@/src/middlewares/auth';

export async function GET(req) {
  try {
    await connectDB();
    const { userId, errorResponse } = runAuth(req);
    if (errorResponse) return errorResponse;

    const [users, projects, tasks, bugs, notes, snippets, files] = await Promise.all([
      User.find({ _id: userId }).select('-password'),
      Project.find({ user: userId }).limit(10),
      Task.find({ user: userId }).limit(10),
      Bug.find({ user: userId }).limit(10),
      Note.find({ user: userId }).limit(10),
      Snippet.find({ user: userId }).limit(10),
      FileModel.find({ user: userId }).limit(10),
    ]);

    return NextResponse.json({
      collections: {
        Users: users,
        Projects: projects,
        Tasks: tasks,
        Bugs: bugs,
        Notes: notes,
        Snippets: snippets,
        Files: files
      }
    });
  } catch (err) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
