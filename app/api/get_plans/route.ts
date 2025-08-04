// app/api/submit/route.ts

import { NextResponse } from "next/server";
import dbConnect from "@/connect/mongodb";
import PlanArray from "@/models/PlanArray";

export async function GET() {
  await dbConnect();

  try {

    const plans = await PlanArray.find({});

    return NextResponse.json({ success: true, data: plans }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: `Error: ${error}` }, { status: 500 });
  }
}
