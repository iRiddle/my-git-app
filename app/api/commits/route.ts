import { NextResponse } from "next/server";
import octokit from "@/app/services/githubClient";

const fetchAllCommits = async () => {
  const allCommits = [];
  const perPage = 100;
  let page = 1;
  let hasMore = true;

  try {
    while (hasMore) {
      const response = await octokit.rest.repos.listCommits({
        headers: {
          "Cache-Control": "no-cache",
          "If-None-Match": "",
        },
        owner: "iRiddle",
        repo: "my-git-app",
        per_page: perPage,
        page,
      });

      const { data } = response;

      if (!data || data.length === 0) {
        hasMore = false;
      } else {
        allCommits.push(...data);
        page++;
      }
    }

    return allCommits;
  } catch (error) {
    console.error("Error fetching commits:", error);
    throw error;
  }
};

export async function GET() {
  try {
    const commits = await fetchAllCommits();
    return NextResponse.json(commits, {
      status: 200,
    });
  } catch (error) {
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
