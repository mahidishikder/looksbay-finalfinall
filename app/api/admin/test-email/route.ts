import { NextResponse } from "next/server";
import { sendInquiryNotification } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const testInquiry = {
      id: "test_" + Date.now(),
      name: "Test Client (Verification)",
      email: "client@example.com",
      whatsapp: "+1 (555) 019-2834",
      project: "Custom Squarespace Website",
      budget: "$3,000 - $5,000",
      message: "This is a test notification confirming that client form submissions will reach your Gmail inbox in real time.",
      createdAt: new Date().toISOString(),
    };

    const result = await sendInquiryNotification(testInquiry);

    if (result.success) {
      return NextResponse.json({ message: "Test email delivered successfully! Check your Gmail inbox." });
    } else {
      return NextResponse.json(
        {
          error: result.error || "Failed to send email. Please check your Gmail App Password.",
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal error sending test email" },
      { status: 500 }
    );
  }
}
