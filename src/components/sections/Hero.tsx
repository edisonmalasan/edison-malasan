import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, FileText } from "lucide-react";
import SmartImage from "@/components/ui/SmartImage";
import { CONTACT_LABEL } from "@/lib/site";

type HeroProps = {
  onOpenAppointment: () => void;
  onOpenResume: () => void;
};

/**
 * Hero: asymmetric split. Oversized identity on the left, a real project
 * preview on the right.
 *
 * The terminal motif is used here and in the footer only. Four text
 * elements total: prompt, name, supporting line, actions.
 */
export default function Hero({
  onOpenAppointment,
  onOpenResume,
}: HeroProps) {
  const reduceMotion = useReducedMotion();

  // Staggered entrance: a short sequence that sets the reading order.
  const rise = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.7,
            delay,
            ease: [0.16, 1, 0.3, 1] as const,
          },
        };

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100dvh] items-center pt-24 pb-16 md:pt-28 md:pb-24"
    >
      <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Left: identity */}
          <div>
            <motion.p {...rise(0)} className="font-mono text-xs text-text-3">
              <span className="text-text-3">edison@server:~$</span>{" "}
              <span className="text-text-2">whoami</span>{" "}
              <span className="text-accent">-a</span>
            </motion.p>

            <motion.h1
              {...rise(0.08)}
              id="hero-title"
              className="mt-6 text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.92] font-semibold tracking-[-0.04em]"
            >
              Edison
              <br />
              <span className="text-text-3">Malasan</span>
            </motion.h1>

            <motion.p
              {...rise(0.16)}
              className="mt-6 max-w-[42ch] text-lg leading-relaxed text-text-2"
            >
              Full stack developer building web applications from the data
              model through to the interface people touch.
            </motion.p>

            <motion.div {...rise(0.24)} className="mt-9 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onOpenAppointment}
                className="pressable inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-control)] bg-accent px-5 text-sm font-semibold whitespace-nowrap text-on-accent hover:bg-accent-hover"
              >
                {CONTACT_LABEL}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={onOpenResume}
                className="pressable inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-control)] border border-line-strong px-5 text-sm font-semibold whitespace-nowrap text-text-1 hover:bg-surface-1"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                View resume
              </button>
            </motion.div>
          </div>

          {/* Right: a real project preview rather than a decorative blob */}
          <motion.figure
            {...rise(0.2)}
            className="relative overflow-hidden rounded-[var(--radius-container)] border border-line bg-surface-1 shadow-[var(--shadow-md)]"
          >
            <div className="aspect-4/3 w-full">
              <SmartImage
                src="/projects/navi-bites.png"
                alt="NaviBites, a canteen food ordering web application built with React, Express, and MongoDB"
                width={960}
                height={720}
                loading="eager"
                fetchPriority="high"
              />
            </div>
            <figcaption className="flex items-center justify-between gap-4 border-t border-line px-4 py-3">
              <span className="font-mono text-xs text-text-3">NaviBites</span>
              <span className="font-mono text-xs text-text-3">
                React / Express / MongoDB
              </span>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
