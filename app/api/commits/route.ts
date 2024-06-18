import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function GET() {
  try {
    const allCommits = [];
    let page = 1;
    let per_page = 30;

    while (true) {
      const { data } = await octokit.repos.listCommits({
        owner: "iRiddle",
        repo: "my-git-app",
        per_page,
        page,
      });

      if (data.length === 0) break;

      allCommits.push(...data);
      page++;
    }

    return NextResponse.json(allCommits, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
        Pragma: "no-cache",
      },
    });
  } catch (error) {
    console.error("Error fetching commits:", error);
    return NextResponse.error();
  }
}
