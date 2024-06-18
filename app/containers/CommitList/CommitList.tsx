import Commit from "@/app/shared/Commit";
import { ICommit } from "@/app/interfaces/ICommit";

interface CommitListProps {
  commits: ICommit[];
}

export const CommitList: React.FC<CommitListProps> = ({ commits }) => (
  <ul>
    {commits.map((commit) => (
      <li key={commit.sha}>
        <Commit commit={commit} />
      </li>
    ))}
  </ul>
);
