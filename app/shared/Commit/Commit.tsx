import { FC } from "react";

import { ICommit } from "@/app/interfaces/ICommit";

interface ICommitProps {
  commit: ICommit;
}

export const Commit: FC<ICommitProps> = ({ commit }) => {
  console.log(commit);
  return <div>Commit</div>;
};
