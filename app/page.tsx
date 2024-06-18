"use client";
import { useState, useEffect } from "react";
import CommitList from "./containers/CommitList";
import Button from "./shared/Button";
import { ICommit } from "./interfaces/ICommit";

const fetchCommits = async (): Promise<ICommit[]> => {
  const res = await fetch("http://localhost:3001/api/commits", {
    headers: {
      "Cache-Control": "no-store, max-age=0",
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

    const socket = new WebSocket("ws://localhost:3001");

    socket.onmessage = (event) => {
      const newCommit = JSON.parse(event.data);
      setCommits((prevCommits) => [newCommit, ...prevCommits]);
    };

    return () => {
      socket.close();
    };
  }, []);

  const refreshCommits = async () => {
    setIsLoading(true);
    try {
      const newCommits = await fetchCommits();
      setCommits(newCommits);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
