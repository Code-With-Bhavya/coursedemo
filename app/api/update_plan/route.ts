import { NextResponse } from "next/server";
import dbConnect from "@/connect/mongodb";
import PlanArray from "@/models/PlanArray";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();
    const { id, ...updatedData } = body;

    // Find the course by ID and update it
    const course = await PlanArray.findOneAndUpdate(
        { id },
        {
          $set: {
            ...updatedData
          }
        },
        { new: true } // Return the updated document
    );

    return NextResponse.json({ success: true, data: course }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: `Error: ${error}` }, { status: 400 });
  }
}
