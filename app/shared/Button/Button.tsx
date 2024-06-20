import { ReactNode, FC, memo } from "react";
import cn from "classnames";

interface IButtonProps {
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  onClick: () => void;
}

export const Button: FC<IButtonProps> = ({
  children,
  disabled,
  className,
  onClick,
}) => (
  <button
    disabled={disabled}
    className={cn(
      "px-4 py-2 bg-blue-500 text-white rounded",
      { "opacity-50 cursor-not-allowed": disabled },
      className
    )}
    onClick={onClick}
  >
    {children}
  </button>
);
