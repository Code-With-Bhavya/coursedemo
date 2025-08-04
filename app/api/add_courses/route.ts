import { NextResponse } from "next/server";
import dbConnect from "@/connect/mongodb";
import Course from "@/models/course";
import { Course as CourseType } from "@/types/plan";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const body = await request.json();
        const { id, title, description, fullDescription, image, price, hotdeal, hours, rating, bestSeller, offer, duration, level, students, tags, learningPoints } = body;

        console.log(offer);

        const newCourse: CourseType = {
            id,
            title,
            description,
            fullDescription,
            image,
            price,
            hotdeal,
            hours,
            bestSeller,
            offer,
            rating,
            duration,
            level,
            students,
            tags,
            learningPoints,
        };

        if (hotdeal) {
            newCourse.start_time = new Date();
        }

        const saved = await Course.create(newCourse);
        console.log("Course saved:", saved);

        return NextResponse.json({ success: true, data: saved }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, message: `Error: ${error}` }, { status: 400 });
    }
}
