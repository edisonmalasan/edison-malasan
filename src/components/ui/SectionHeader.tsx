import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

type SectionHeaderProps = {
  /** Short uppercase label. Rationed to one per three sections. */
  eyebrow?: string;
  title: React.ReactNode;
  /** Optional supporting line, stacked below the title. */
  lede?: string;
  /** Slot for trailing controls, aligned to the header baseline. */
  aside?: React.ReactNode;
  className?: string;
  /** Heading level, so each section keeps a correct document outline. */
  as?: "h1" | "h2" | "h3";
};

/**
 * The shared section header.
 *
 * Headline and supporting copy stack vertically rather than splitting
 * into a headline-plus-explainer row, so the section carries one
 * focused message.
 */
export default function SectionHeader({
  eyebrow,
  title,
  lede,
  aside,
  className,
  as: Tag = "h2",
}: SectionHeaderProps) {
  return (
    <Reveal>
      <div
        className={cn(
          "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between",
          className,
        )}
      >
        <div className="max-w-2xl">
          {eyebrow ? (
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-text-3">
              {eyebrow}
            </p>
          ) : null}
          <Tag className="text-3xl leading-[1.05] sm:text-4xl md:text-5xl">
            {title}
          </Tag>
          {lede ? (
            <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-text-3">
              {lede}
            </p>
          ) : null}
        </div>
        {aside ? <div className="shrink-0">{aside}</div> : null}
      </div>
    </Reveal>
  );
}
