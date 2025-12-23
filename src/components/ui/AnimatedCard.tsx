import * as React from "react";
import { cn } from "@/lib/utils";

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
  hover?: boolean;
}

const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ className, delay = 0, hover = true, style, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          ...style,
          animationDelay: `${delay}ms`,
        }}
        className={cn(
          "rounded-2xl bg-card p-6 shadow-md border border-border/50",
          "animate-slide-up opacity-0",
          hover && "transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AnimatedCard.displayName = "AnimatedCard";

export { AnimatedCard };