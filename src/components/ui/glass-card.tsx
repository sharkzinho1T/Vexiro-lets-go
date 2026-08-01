import { cn } from "@/lib/utils";

export function GlassCard({
  className,
  children,
  strong,
}: {
  className?: string;
  children: React.ReactNode;
  strong?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl",
        strong ? "glass-strong" : "glass",
        className
      )}
    >
      {children}
    </div>
  );
}
