// app/api/resume/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Resume } from "@/models/Resume";

export const PUT = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const body = await req.json();

    if (!id) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    await connectToDatabase();

    // Upsert the resume data
    const resume = await Resume.findOneAndUpdate(
      { userId: id },
      { ...body, userId: id },
      { new: true, upsert: true }
    );

    return NextResponse.json(resume);
  } catch (error) {
    console.error("Save resume error:", error);
    return NextResponse.json(
      { error: "Failed to save resume" },
      { status: 500 }
    );
  }
};
