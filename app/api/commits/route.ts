import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function GET() {
  console.log("Fetching commits...");

  try {
    const { data } = await octokit.repos.listCommits({
      owner: "iRiddle",
      repo: "my-git-app",
      per_page: 20,
      headers: {
        "Cache-Control": "no-store",
        Pragma: "no-cache",
        "If-None-Match": "",
      },
    });

    console.log("Fetched commits:", data);

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
        Pragma: "no-cache",
        "If-None-Match": "",
      },
    });
  } catch (error) {
    console.error("Error fetching commits:", error);
    return NextResponse.error();
  }
}
