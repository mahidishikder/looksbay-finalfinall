import { NextResponse } from "next/server";
import { getInquiriesList, addInquiry, updateInquiryStatus, deleteInquiryItem } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get("format");
    const inquiries = await getInquiriesList();

    if (format === "csv") {
      const header = "ID,Name,Email,WhatsApp,Project,Budget,Status,CreatedAt,Message\n";
      const rows = inquiries
        .map(
          (i) =>
            `"${i.id}","${(i.name || "").replace(/"/g, '""')}","${(i.email || "").replace(/"/g, '""')}","${(i.whatsapp || "").replace(/"/g, '""')}","${(i.project || "").replace(/"/g, '""')}","${(i.budget || "").replace(/"/g, '""')}","${i.status || "New"}","${i.createdAt}","${(i.message || "").replace(/"/g, '""').replace(/\r?\n/g, ' ')}"`
        )
        .join("\n");

      return new NextResponse(header + rows, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="looksbay-inquiries-${new Date()
            .toISOString()
            .slice(0, 10)}.csv"`,
        },
      });
    }

    return NextResponse.json({
      count: inquiries.length,
      inquiries,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error while fetching inquiries" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, whatsapp, phone, project, budget, message, template } = body;

    const clientPhone = (whatsapp || phone || "").trim();

    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!email || !email.trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    if (!clientPhone) {
      return NextResponse.json({ error: "WhatsApp / phone number is required" }, { status: 400 });
    }
    if (!message || !message.trim()) {
      return NextResponse.json({ error: "Project details/description is required" }, { status: 400 });
    }

    const newInquiry = {
      id: "inq_" + Date.now(),
      name: name.trim(),
      email: email.trim(),
      whatsapp: clientPhone,
      project: (project || "Custom website").trim(),
      budget: (budget || "Let's discuss").trim(),
      message: message.trim(),
      template: (template || "").trim(),
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
