import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";

console.log("GITHUB_TOKEN:", process.env.GITHUB_TOKEN);

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function GET() {
  try {
    const { data } = await octokit.repos.listCommits({
      owner: "iRiddle",
      repo: "my-git-app",
      per_page: 10,
    });

    console.log(data);

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
