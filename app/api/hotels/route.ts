import { connectToDB } from "@/lib/database";
// import Hotel from "@/models/hotel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const body = req.body;
  try {
    await connectToDB();
    console.log(body);

    return NextResponse.json({ data: "Nice Response" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "an error occurred" }, { status: 404 });
  }
}
