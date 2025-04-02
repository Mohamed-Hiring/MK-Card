import { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export default function Card({ className, children, ...props }: CardProps) {
  return (
    <div className={cn("rounded-xl border bg-white text-black shadow", className)} {...props}>
      {children}
    </div>
  );
}
