import { NextResponse } from 'next/server';
import dbConnect from "@/connect/mongodb";
import Planarray from '@/models/Planarray';


export async function POST(request: Request) {
    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json({ error: 'Plan ID is required' }, { status: 400 });
        }

        // Simulate deletion logic (replace with actual database logic)

        await dbConnect();
       const deleted =  await Planarray.deleteOne({ id });

        if (deleted) {
            return NextResponse.json({success: true, message: `Plan with ID ${id} deleted successfully` });
        } else {
            return NextResponse.json({ success: false,error: 'Failed to delete plan' }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ error: `${error}` }, { status: 500 });
    }
}