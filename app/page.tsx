"use client";
import { useState, useEffect, useCallback } from "react";
import CommitList from "./containers/CommitList";
import Button from "./shared/Button";
import { ICommit } from "./interfaces/ICommit";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiRefreshCw } from "react-icons/fi";

const fetchCommits = async (): Promise<ICommit[]> => {
  const res = await fetch("http://localhost:3001/api/commits", {
    headers: {
      "Cache-Control": "no-store, max-age=0",
      Pragma: "no-cache",
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to fetch commits");
  }

  return res.json();
};

const useCommits = () => {
  const [commits, setCommits] = useState<ICommit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCommits = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const initialCommits = await fetchCommits();
      setCommits(initialCommits);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCommits();

    const socket = new WebSocket("ws://localhost:3001");

    socket.onmessage = (event) => {
      const newCommit = JSON.parse(event.data);
      setCommits((prevCommits) => [newCommit, ...prevCommits]);
    };

    return () => {
      socket.close();
    };
  }, [loadCommits]);

  return { commits, isLoading, error, loadCommits };
};

const Home = () => {
  const { commits, isLoading, error, loadCommits } = useCommits();

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">
          <span className="text-blue-500">There are</span>{" "}
          <span className="text-black">{commits.length}</span>{" "}
          <span className="text-black">commits</span>
        </h1>
        <Button
          onClick={loadCommits}
          disabled={isLoading}
          className="flex items-center"
        >
          {isLoading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            <FiRefreshCw />
          )}
        </Button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <CommitList commits={commits} />
    </div>
  );
};

export default Home;
