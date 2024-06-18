import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function GET() {
  try {
    const { data } = await octokit.repos.listCommits({
      owner: "your-github-username",
      repo: "your-repo-name",
      per_page: 10,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.error();
  }
}
