import React from "react";
import { ICommit } from "@/app/interfaces/ICommit";
import { formatDistanceToNow, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

interface CommitProps {
  commit: ICommit;
}

export const Commit: React.FC<CommitProps> = ({ commit }) => {
  const commitDate = parseISO(commit.commit.author.date);

  return (
    <div className="border border-gray-300 rounded-lg p-6 mb-5 transition duration-300 hover:border-blue-500 hover:text-blue-500 cursor-pointer">
      <span className="font-bold text-lg">{commit.commit.message}</span>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">
          by {commit.commit.author?.name || "Unknown"}
        </span>
        <span className="text-sm text-gray-400">
          {formatDistanceToNow(commitDate, { addSuffix: true, locale: ru })}
        </span>
      </div>
    </div>
  );
};

export default Commit;
