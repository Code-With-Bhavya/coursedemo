// app/api/courses/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/connect/mongodb";

export async function POST(request: Request) {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("coursewala");

    try {
        const body = await request.json();
        console.log("Received data:", body);
        const  updatedData  = body;

        const courseExists = await collection.findOne({ "plans.id": `${updatedData.id}` });
        if (!courseExists) {
            console.error("Plan not found for ID:", updatedData.id);
            return NextResponse.json({ success: false, message: "Plan not found" }, { status: 404 });
        }

        
        const course = await collection.findOneAndUpdate(
            { "plans.id": `${updatedData.id}` }, // nested id match
            { $set: { "plans.$": updatedData } }, // positional operator $
            { returnDocument: "after" }
        );

        console.log("Updated course:", course);

        return NextResponse.json({ success: true, data: course }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, message: `Error: ${error}` }, { status: 400 });
    }
}
