import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Distribution from '@/models/Distribution';
import { getServerSession } from 'next-auth';

export async function GET() {
  try {
    await connectDB();
    const distributions = await Distribution.find({});
    return NextResponse.json(distributions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch distributions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const distribution = await Distribution.create(data);
    return NextResponse.json(distribution);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create distribution' }, { status: 500 });
  }
}