import { cn } from "../../lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export default function CardContent({ className, ...props }: CardProps) {
  return (
    <div className={cn("p-4", className)} {...props} />
  );
}
