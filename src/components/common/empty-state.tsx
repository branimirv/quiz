import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "bg-white border border-slate-200 rounded-lg py-16 text-center",
        className
      )}
    >
      <div className="max-w-sm mx-auto">
        {icon && <div className="mb-4 flex justify-center">{icon}</div>}
        <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
        {description && <p className="text-slate-500 mb-6">{description}</p>}
        {action && <div>{action}</div>}
      </div>
    </div>
  );
}
