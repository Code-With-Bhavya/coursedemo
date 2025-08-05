// app/api/submit/route.ts

import { NextResponse } from "next/server";
import clientPromise from "@/connect/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);
  const collection = db.collection("coursewala");

  try {

    const plans = await collection.find({}).toArray();
    console.log("Plans retrieved:", JSON.stringify(plans[0].plans, null, 2));

    return NextResponse.json({ success: true, data: plans[0].plans }, { status: 200 } );
  } catch (error) {
    return NextResponse.json({ success: false, message: `Error: ${error}` }, { status: 500 });
  }
}
