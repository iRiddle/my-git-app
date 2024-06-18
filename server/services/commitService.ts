import octokit from "../utils/githubClient";
import { Commit } from "../models/commitModel";

export const fetchLatestCommit = async (): Promise<Commit> => {
  try {
    const { data } = await octokit.repos.listCommits({
      owner: "iRiddle",
      repo: "my-git-app",
      per_page: 1,
    });

    return data[0] as Commit;
  } catch (error) {
    console.error("Error fetching latest commit:", error);
    throw error;
  }
};

export const fetchAllCommits = async (): Promise<Commit[]> => {
  const allCommits: Commit[] = [];
  const perPage = 30;
  const maxPages = 10;
  let page = 1;
  let hasMore = true;

  try {
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
        allCommits.push(...(data as Commit[]));
        page++;
      }
    }
    return allCommits;
  } catch (error) {
    console.error("Error fetching all commits:", error);
    throw error;
  }
};

export default {
  fetchLatestCommit,
  fetchAllCommits,
};
