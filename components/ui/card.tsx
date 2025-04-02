import { cn } from "../../lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export default function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn("rounded-xl border bg-white shadow-sm", className)}
      {...props}
    />
  );
}
