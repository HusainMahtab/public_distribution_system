import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Distribution from '@/models/Distribution';

interface Params {
  id: string;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await connectDB();
    const { id } = params;
    const data = await request.json();
    
    const updatedDistribution = await Distribution.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );

    if (!updatedDistribution) {
      return NextResponse.json(
        { error: 'Distribution not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedDistribution);
  } catch (error) {
    console.error('Error updating distribution:', error);
    return NextResponse.json(
      { error: 'Failed to update distribution' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await connectDB();
    const { id } = params;
    
    const deletedDistribution = await Distribution.findByIdAndDelete(id);

    if (!deletedDistribution) {
      return NextResponse.json(
        { error: 'Distribution not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Distribution deleted successfully' });
  } catch (error) {
    console.error('Error deleting distribution:', error);
    return NextResponse.json(
      { error: 'Failed to delete distribution' },
      { status: 500 }
    );
  }
}