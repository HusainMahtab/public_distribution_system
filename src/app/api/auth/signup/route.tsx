import User from '@/models/User';
import connectDB from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// Connect to database
await connectDB();

// GET all users
export async function GET() {
  try {
    const users = await User.find({}).select('-password');
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST create new user
export async function POST(request:Request) {
  try {
    const { fullName, email, password, role } = await request.json();
    
    // Validate input
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ fullName, email, password:hashedPassword, role });
    await user.save();
    return NextResponse.json({success:true, message:"user created successfuly"}, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}