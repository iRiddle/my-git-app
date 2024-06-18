import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function GET() {
  try {
    let page = 1;
    const perPage = 25;
    let allCommits = [];

    while (true) {
      const { data } = await octokit.repos.listCommits({
        owner: "iRiddle",
        repo: "my-git-app",
        per_page: perPage,
        page: page,
        headers: {
          "Cache-Control": "no-store",
          Pragma: "no-cache",
        },
      });

      if (data.length === 0) {
        break;
      }

      allCommits = allCommits.concat(data);
      if (data.length < perPage) {
        break;
      }

      page += 1;
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
