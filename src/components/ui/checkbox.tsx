import * as React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      type="checkbox"
      className={cn(
        "h-4 w-4 rounded border border-neutral-300 text-black accent-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);

Checkbox.displayName = "Checkbox";
