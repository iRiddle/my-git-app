"use client";
import { useState, useEffect } from "react";
import CommitList from "./containers/CommitList";
import Button from "./shared/Button";
import { ICommit } from "./interfaces/ICommit";

const fetchCommits = async (): Promise<ICommit[]> => {
  const res = await fetch("/api/commits", {
    headers: {
      "Cache-Control": "no-store",
      Pragma: "no-cache",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch commits");
  }

  return res.json();
};

const Home = () => {
  const [commits, setCommits] = useState<ICommit[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadCommits = async () => {
    setIsLoading(true);
    try {
      const initialCommits = await fetchCommits();
      setCommits(initialCommits);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCommits();
  }, []);

  const refreshCommits = async () => {
    await loadCommits();
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">
        There are {commits.length} commits
      </h1>
      <Button onClick={refreshCommits} disabled={isLoading} className="mb-4">
        {isLoading ? "Refreshing..." : "Refresh"}
      </Button>
      <CommitList commits={commits} />
    </div>
  );
};

export default Home;
