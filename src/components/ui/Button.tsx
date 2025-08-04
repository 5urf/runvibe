import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../../../lib/utils";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "gradient" | "secondary";
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  (
    { variant = "primary", size = "md", className, children, ...props },
    ref
  ) => {
    const variantClasses = {
      primary: "btn-primary",
      gradient: "btn-gradient",
      secondary: "btn-secondary",
    };

    const sizeClasses = {
      sm: "btn-sm",
      md: "btn-md",
      lg: "btn-lg",
      xl: "btn-xl",
      "2xl": "btn-2xl",
    };

    return (
      <button
        ref={ref}
        className={cn(variantClasses[variant], sizeClasses[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
