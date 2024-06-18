import React from "react";
import Commit from "@/app/shared/Commit";
import { ICommit } from "@/app/interfaces/ICommit";

interface CommitListProps {
  commits: ICommit[];
}

export const CommitList: React.FC<CommitListProps> = ({ commits }) => {
  return (
    <ul>
      {commits.map((commit, index) => (
        <li key={index}>
          <Commit key={commit.sha} commit={commit} />
        </li>
      ))}
    </ul>
  );
};
