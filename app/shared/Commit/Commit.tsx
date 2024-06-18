import React from "react";
import { ICommit } from "@/app/interfaces/ICommit";

interface CommitProps {
  commit: ICommit;
}

export const Commit: React.FC<CommitProps> = ({ commit }) => {
  const commitDate = new Date(commit.commit.author.date);

  const localeDate = commitDate.toLocaleString("ru-RU", {
    day: "numeric",
    month: "long",
  });

  const localeTime = commitDate.toLocaleString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="border border-gray-300 rounded-lg p-6 mb-5 transition duration-300 hover:border-blue-500 hover:text-blue-500 cursor-pointer">
      <span className="font-bold text-lg">{commit.commit.message}</span>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">
          by {commit.commit.author.name}
        </span>
        <span className="text-sm text-gray-400">
          {`${localeDate} в ${localeTime}`}
        </span>
      </div>
    </div>
  );
};

export default Commit;
