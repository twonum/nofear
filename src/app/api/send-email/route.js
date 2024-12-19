// src/app/api/send-email/route.js
import { sendMail } from "@/lib/newMail";

export async function POST(req) {
    const { to, subject, body, attachment } = await req.json();

    try {
        await sendMail({ to, subject, body, attachment });
        return new Response(JSON.stringify({ message: "Email sent successfully" }), { status: 200 });
    } catch (error) {
        console.error("Error sending email:", error);
        return new Response(
            JSON.stringify({ message: "Failed to send email", error: error.message }),
            { status: 500 }
        );
    }
}
