import { useState } from "react";
import { cn } from "@/lib/utils";

type SmartImageProps = {
  /**
   * Source path. Omit it entirely when no real asset exists for this
   * record, so the fallback panel renders without issuing a request
   * for a file that is known to be missing.
   */
  src?: string;
  /** Describes the image content for screen readers. */
  alt: string;
  className?: string;
  /** Intrinsic dimensions, used to reserve space and prevent layout shift. */
  width?: number;
  height?: number;
  /** Text shown in the fallback panel when the image cannot load. */
  fallbackLabel?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
};

/**
 * An image that reserves its space and degrades to a typographic panel.
 *
 * Motivation: several certification and project records point at files
 * that do not exist. A broken image icon is worse than a labelled
 * panel, so a load failure falls back to the label.
 */
export default function SmartImage({
  src,
  alt,
  className,
  width,
  height,
  fallbackLabel,
  loading = "lazy",
  fetchPriority = "auto",
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  // No asset recorded, or the request failed: render the labelled panel.
  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex h-full w-full items-center justify-center bg-surface-2 p-6",
          "font-mono text-xs uppercase tracking-[0.16em] text-text-3",
          className,
        )}
      >
        {fallbackLabel ?? alt}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      draggable={false}
      onError={() => setFailed(true)}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
