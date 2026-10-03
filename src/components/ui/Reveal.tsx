import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Vertical offset in pixels before the element settles. */
  distance?: number;
  /** Delay in seconds, used to order a sequence. */
  delay?: number;
  className?: string;
};

/**
 * Reveals content once as it enters the viewport.
 *
 * Motivation: establishes narrative order as the visitor scrolls down.
 * Under a reduced-motion preference the element renders at its final
 * state with no transform and no fade.
 */
export default function Reveal({
  children,
  distance = 22,
  delay = 0,
  className,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
