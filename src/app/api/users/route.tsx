import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

import { User } from "@/models/userModel";


// ✅ GET: Fetch all users
export async function GET() {
  await connectToDatabase();
  const users = await User.find();
  return NextResponse.json(users, { status: 200 });
}

// ✅ POST: Add a new user
export async function POST(req: NextRequest) {
  await connectToDatabase();
  const { name, phone, email } = await req.json();
  const newUser = new User({ name, phone, email });
  await newUser.save();
  return NextResponse.json({ message: "User added successfully" }, { status: 201 });
}

export async function PUT(req: NextRequest) {
    await connectToDatabase();
    
    try {
      const { id, name, phone, email } = await req.json();
  
      if (!id) {
        return NextResponse.json({ error: "User ID is required" }, { status: 400 });
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, phone, email },
        { new: true } // Returns the updated document
      );
  
      if (!updatedUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "User updated successfully", user: updatedUser }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Error updating user", details: error }, { status: 500 });
    }
  }
  

  export async function DELETE(req: NextRequest) {
    await connectToDatabase();
  
    try {
      const { id } = await req.json();
  
      if (!id) {
        return NextResponse.json({ error: "User ID is required" }, { status: 400 });
      }
  
      const deletedUser = await User.findByIdAndDelete(id);
  
      if (!deletedUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Error deleting user", details: error }, { status: 500 });
    }
  }
  
