import { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function CardContent({ children, className, ...props }: CardContentProps) {
  return (
    <div className={cn("p-4", className)} {...props}>
      {children}
    </div>
  );
}
