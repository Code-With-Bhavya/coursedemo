// import { NextRequest, NextResponse } from "next/server";
// import dbConnect from "@/connect/mongodb";
// import Course from "@/models/course";

// // pages/api/buy-course.js

// export async function POST(req: NextRequest) {
//   console.log("POST request received"); // Debugging log
//   try {
//     const body = await req.json();
//     console.log("Request body:", body); // Debugging log

//     const { upiName, courseid, telegramUsername, screenshotUrl } = body;
//     console.log("Parsed fields:", {
//       upiName,
//       courseid,
//       telegramUsername,
//       screenshotUrl,
//     }); // Debugging log

//     // get name of the course from id
//     await dbConnect();
//     const course = await Course.findOne({ id: courseid });

//     const TELEGRAM_BOT_TOKEN = "8037852557:AAGpNFcU9anpO8fmoD6uzVg27IIgrnAmTcI";
//     const TELEGRAM_USER_ID = "7410986089";

//     console.log("Telegram Bot Token:", TELEGRAM_BOT_TOKEN); // Debugging log
//     console.log("Telegram User ID:", TELEGRAM_USER_ID); // Debugging log

//     const message = `
//     🎓 *New Course Purchase Request* 🎓
    
//      UPINAME: ${upiName}
//      COURSENAME: ${course.title}
//      USERNAME: ${telegramUsername}
//     SCREENSHOT: ${screenshotUrl}
//         `;
//     console.log("Generated message:", message); // Debugging log

//     const response = await fetch(
//       `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           chat_id: TELEGRAM_USER_ID,
//           text: message,
//           parse_mode: "Markdown",
//         }),
//       }
//     );

//     console.log("Telegram API response status:", response.status); // Debugging log
//     if (!response.ok) {
//       console.error("Telegram API error:", await response.text()); // Debugging log
//     }

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error("Error occurred:", err); // Debugging log
//     return NextResponse.json({ success: false }, { status: 500 });
//   }
// }
