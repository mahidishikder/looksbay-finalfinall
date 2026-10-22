import { NextResponse } from "next/server";
import { getInquiriesList, addInquiry, updateInquiryStatus, deleteInquiryItem } from "@/lib/db";

export async function GET() {
  const inquiries = await getInquiriesList();
  return NextResponse.json({
    count: inquiries.length,
    inquiries,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, project, budget, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const newInquiry = {
      id: "inq_" + Date.now(),
      name: name.trim(),
      email: email.trim(),
      project: project || "Custom Development",
      budget: budget || "$1,500 - $3,000",
      message: message.trim(),
      status: "New",
      createdAt: new Date().toISOString(),
    };

    await addInquiry(newInquiry);

    return NextResponse.json(
      { message: "Inquiry saved successfully", inquiry: newInquiry },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error while processing inquiry" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Inquiry ID and new status are required" },
        { status: 400 }
      );
    }

    await updateInquiryStatus(id, status);

    return NextResponse.json({
      message: `Inquiry status updated to ${status}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error while updating status" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Inquiry ID is required" },
        { status: 400 }
      );
    }

    await deleteInquiryItem(id);

    return NextResponse.json({
      message: "Inquiry deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error while deleting inquiry" },
      { status: 500 }
    );
  }
}
