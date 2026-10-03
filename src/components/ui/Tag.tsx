import { cn } from "@/lib/utils";

type TagProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * A technology or metadata tag.
 *
 * Uses the small radius from the documented radius scale: tags are
 * controls, not containers, so they sit tighter than a card.
 */
export default function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[var(--radius-control)] border border-line",
        "bg-surface-1 px-2.5 py-1 font-mono text-[11px] leading-none text-text-3",
        className,
      )}
    >
      {children}
    </span>
  );
}
