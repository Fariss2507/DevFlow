import { NextResponse } from 'next/server';
import connectDB from '@/src/config/db';
import Deployment from '@/src/models/Deployment';
import { runAuth } from '@/src/middlewares/auth';

export async function GET(req) {
  try {
    await connectDB();
    const { userId, errorResponse } = runAuth(req);
    if (errorResponse) return errorResponse;

    let deployments = await Deployment.find({ user: userId }).sort({ createdAt: -1 });

    if (deployments.length === 0) {
      deployments = await Deployment.insertMany([
        {
          user: userId,
          name: 'devforge-api-production',
          environment: 'production',
          status: 'Success',
          commitMessage: 'feat: add full AI workspace & database explorer',
          branch: 'main',
          logs: ['[00:00:01] Building Next.js application...', '[00:00:08] Compiling 28 route handlers...', '[00:00:14] Deployment live on Vercel Edge.'],
          envVars: [{ key: 'NODE_ENV', value: 'production' }, { key: 'JWT_SECRET', value: '••••••••••••' }]
        },
        {
          user: userId,
          name: 'devforge-api-preview-pr-14',
          environment: 'preview',
          status: 'Success',
          commitMessage: 'fix: CORS preflight options handler',
          branch: 'fix/cors-preflight',
          logs: ['[00:00:01] Preview build initialized...', '[00:00:06] Deployment ready for QA.'],
          envVars: [{ key: 'NODE_ENV', value: 'development' }]
        }
      ]);
    }

    return NextResponse.json(deployments);
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
    const newDeployment = new Deployment({
      ...body,
      user: userId,
      logs: ['[00:00:00] Manual build triggered...', '[00:00:03] Compiling routes...', '[00:00:07] Successfully deployed.']
    });
    await newDeployment.save();

    return NextResponse.json(newDeployment, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
