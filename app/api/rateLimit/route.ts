// app/api/rateLimit/route.ts
import { NextResponse } from "next/server";
import octokit from "@/app/services/githubClient";

export async function GET() {
  try {
    const { data } = await octokit.rest.rateLimit.get();
    return NextResponse.json(data, {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching rate limit:", error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { message: "Unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
