"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../../../lib/utils";

interface IBackButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
}

const BackButton = forwardRef<HTMLButtonElement, IBackButtonProps>(
  ({ size = "md", className, ...props }, ref) => {
    const router = useRouter();

    const sizeClasses = {
      sm: "w-8 h-8",
      md: "w-10 h-10",
      lg: "w-12 h-12",
    };

    const iconSizes = {
      sm: 16,
      md: 20,
      lg: 24,
    };

    const handleClick = () => router.back();

    return (
      <button
        ref={ref}
        className={cn(
          "flex items-center justify-center bg-white/60 backdrop-blur-sm border border-white/20 text-gray-700 hover:bg-white/80 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95",
          sizeClasses[size],
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <ArrowLeft size={iconSizes[size]} />
      </button>
    );
  }
);

BackButton.displayName = "BackButton";

export default BackButton;
