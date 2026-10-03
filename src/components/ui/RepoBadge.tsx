import { Lock, Globe } from "lucide-react";

type RepoBadgeProps = {
  type: "public" | "private";
};

/**
 * Repository visibility, stated in text rather than by icon alone.
 *
 * A private repository is the one case where the accent is used
 * deliberately: it carries real meaning here rather than decoration.
 */
export default function RepoBadge({ type }: RepoBadgeProps) {
  const isPrivate = type === "private";

  return (
    <span
      className={[
        "inline-flex shrink-0 items-center gap-1.5 rounded-[var(--radius-control)]",
        "px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em]",
        isPrivate
          ? "border border-[var(--accent-line)] bg-[var(--accent-quiet)] text-accent"
          : "border border-line bg-surface-1 text-text-3",
      ].join(" ")}
    >
      {isPrivate ? (
        <Lock className="h-3 w-3" aria-hidden="true" />
      ) : (
        <Globe className="h-3 w-3" aria-hidden="true" />
      )}
      {isPrivate ? "Private" : "Public"}
    </span>
  );
}
