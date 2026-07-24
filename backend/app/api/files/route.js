import { NextResponse } from 'next/server';
import connectDB from '@/src/config/db';
import FileModel from '@/src/models/File';
import Activity from '@/src/models/Activity';
import { runAuth } from '@/src/middlewares/auth';

export async function GET(req) {
  try {
    await connectDB();
    const { userId, errorResponse } = runAuth(req);
    if (errorResponse) return errorResponse;

    let files = await FileModel.find({ user: userId }).sort({ createdAt: -1 });
    
    // Seed initial demo files if empty
    if (files.length === 0) {
      const demoFiles = [
        { name: 'architecture_v2.pdf', folder: 'Docs', category: 'Document', size: '1.4 MB', fileType: 'pdf' },
        { name: 'schema_design.json', folder: 'Config', category: 'Data', size: '42 KB', fileType: 'json' },
        { name: 'app_hero_banner.png', folder: 'Assets', category: 'Image', size: '850 KB', fileType: 'png' },
        { name: 'authMiddleware.js', folder: 'Source', category: 'Code', size: '12 KB', fileType: 'js' },
      ];
      files = await FileModel.insertMany(demoFiles.map(f => ({ ...f, user: userId })));
    }

    return NextResponse.json(files);
  } catch (err) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const { userId, errorResponse } = runAuth(req);
    if (errorResponse) return errorResponse;

    const body = await req.json();
    const newFile = new FileModel({ ...body, user: userId });
    await newFile.save();

    // Log Activity
    await new Activity({
      user: userId,
      action: 'Uploaded File',
      details: `Uploaded ${newFile.name} (${newFile.size})`,
      category: 'files'
    }).save();

    return NextResponse.json(newFile, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
