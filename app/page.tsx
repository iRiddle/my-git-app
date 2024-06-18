import { useState } from "react";
import { GetServerSideProps } from "next";
import CommitList from "./containers/CommitList";
import { ICommit } from "./interfaces/ICommit";

interface HomeProps {
  initialCommits: ICommit[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    "https://api.github.com/repos/your-github-username/your-repo-name/commits",
    {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    }
  );

  const initialCommits = await res.json();

  return {
    props: {
      initialCommits,
    },
  };
};

const Home: React.FC<HomeProps> = ({ initialCommits }) => {
  const [commits, setCommits] = useState<Commit[]>(initialCommits);
  const [isLoading, setIsLoading] = useState(false);

  const refreshCommits = async () => {
    setIsLoading(true);
    const res = await fetch("/api/commits");
    const newCommits = await res.json();
    setCommits(newCommits);
    setIsLoading(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Git Commit History</h1>
      <button
        onClick={refreshCommits}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isLoading ? "Refreshing..." : "Refresh"}
      </button>
      <CommitList commits={commits} />
    </div>
  );
};

export default Home;
