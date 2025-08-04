// app/api/submit/route.ts

import { NextResponse } from "next/server";
import dbConnect from "@/connect/mongodb";
import Planarray from "@/models/Planarray";

export async function GET() {
  await dbConnect();

  try {

    const plans = await Planarray.find({});


    return NextResponse.json({ success: true, data: plans }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: `Error: ${error}` }, { status: 500 });
  }
}
