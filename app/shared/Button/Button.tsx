import React, { FC } from "react";

interface IButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}

export const Button: FC<IButtonProps> = ({ onClick, children, disabled }) => (
  <button
    disabled={disabled}
    className={`px-4 py-2 bg-blue-500 text-white rounded ${
      disabled ? "opacity-50 cursor-not-allowed" : ""
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);
