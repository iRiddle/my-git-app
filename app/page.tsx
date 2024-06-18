"use client";
import { useState, useEffect } from "react";
import CommitList from "./containers/CommitList";
import Button from "./shared/Button";

import { ICommit } from "./interfaces/ICommit";

const fetchCommits = async (): Promise<ICommit[]> => {
  const res = await fetch("/api/commits");

  if (!res.ok) {
    throw new Error("Failed to fetch commits");
  }

  return res.json();
};

const Home = () => {
  const [commits, setCommits] = useState<ICommit[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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

    loadCommits();
  }, []);

  const refreshCommits = async () => {
    setIsLoading(true);
    try {
      const newCommits = await fetch("/api/commits").then((res) => res.json());
      setCommits(newCommits);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">История коммитов</h1>
      <Button onClick={refreshCommits} disabled={isLoading} className="mb-4">
        {isLoading ? "Refreshing..." : "Refresh"}
      </Button>
      <CommitList commits={commits} />
    </div>
  );
};

export default Home;
