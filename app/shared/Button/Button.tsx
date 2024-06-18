import React, { ReactNode, FC, forwardRef, ButtonHTMLAttributes } from "react";
import cn from "classnames";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export const Button: FC<IButtonProps> = forwardRef<
  HTMLButtonElement,
  IButtonProps
>(({ children, className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "px-4 py-2 bg-blue-500 text-white rounded transition duration-300",
      {
        "opacity-50 cursor-not-allowed": props.disabled,
      },
      className
    )}
    {...props}
  >
    {children}
  </button>
));

Button.displayName = "Button";
