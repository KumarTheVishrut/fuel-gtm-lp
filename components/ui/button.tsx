import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary";
  size?: "default" | "sm" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          variant === "default" && "bg-primary text-primary-foreground hover:bg-primary/90",
          variant === "secondary" && "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          size === "default" && "h-9 px-4 text-sm",
          size === "sm" && "h-8 px-3 text-xs",
          size === "lg" && "h-11 px-8 text-base",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
