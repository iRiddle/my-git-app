import React, { FC } from "react";

interface ISpinnerProps {
  isLoading: boolean;
}

export const Spinner: FC<ISpinnerProps> = ({ isLoading }) => {
  return <div>{isLoading}</div>;
};
