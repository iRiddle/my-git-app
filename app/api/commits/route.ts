import { NextResponse } from "next/server";
import octokit from "@/app/services/githubClient";

const fetchCommits = async () => {
  const allCommits = [];
  const perPage = 50;
  const maxPages = 10;
  let page = 1;
  let hasMore = true;

  while (hasMore && page <= maxPages) {
    const { data } = await octokit.repos.listCommits({
      owner: "iRiddle",
      repo: "my-git-app",
      per_page: perPage,
      page,
    });

    if (data.length === 0) {
      hasMore = false;
    } else {
      allCommits.push(...data);
      page++;
    }
  }

  return allCommits;
};

export async function GET() {
  try {
    const commits = await fetchCommits();
    return NextResponse.json(commits, {
      status: 200,
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (error) {
    console.error("Error fetching commits:", error);
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
