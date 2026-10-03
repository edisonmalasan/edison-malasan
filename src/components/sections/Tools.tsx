import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import SectionHeader from "@/components/ui/SectionHeader";
import { TECH_STACK, TIER_CLASSES, TIER_LABELS, type Tier } from "@/lib/tools";

const TIERS: Tier[] = ["S", "A", "B"];

/**
 * Tools: a tiered grid with a scroll-linked progress rail.
 *
 * The rail communicates position within a long list, which a plain list
 * cannot convey on its own. It reads scroll through Motion's useScroll,
 * so nothing re-renders per frame.
 */
export default function Tools() {
  const reduceMotion = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start end", "end start"],
  });

  // Spring-smoothed so the rail glides rather than snapping.
  const railProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });
  const railScale = useTransform(railProgress, [0, 1], [0, 1]);

  return (
    <section
      id="stack"
      aria-labelledby="tools-title"
      className="scroll-mt-24 border-t border-line py-20 md:py-28"
    >
      <div className="shell">
        <SectionHeader
          as="h2"
          title={
            <span id="tools-title">
              Tools I work
              <br />
              <span className="text-text-3">with every day</span>
            </span>
          }
          lede="Grouped by what they are for. The tiers describe how comfortably I use each one, not how fashionable it is."
          aside={
            <ul className="flex flex-wrap gap-2">
              {TIERS.map((tier) => (
                <li
                  key={tier}
                  className={`rounded-[var(--radius-control)] border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] ${TIER_CLASSES[tier]}`}
                >
                  {tier} / {TIER_LABELS[tier]}
                </li>
              ))}
            </ul>
          }
        />

        <div ref={listRef} className="relative mt-12 lg:mt-16 lg:pl-10">
          {/* Scroll-linked progress rail */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-0 hidden w-px bg-line lg:block"
          >
            <motion.div
              className="absolute inset-x-0 top-0 origin-top bg-accent"
              style={reduceMotion ? { height: "100%" } : { height: "100%", scaleY: railScale }}
            />
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
            {TECH_STACK.map((category, categoryIndex) => (
              <div key={category.title}>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-3">
                  {category.title}
                </h3>

                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {category.items.map((tech, techIndex) => (
                    <motion.li
                      key={tech.name}
                      initial={
                        reduceMotion ? false : { opacity: 0, y: 14 }
                      }
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{
                        duration: 0.45,
                        delay: categoryIndex * 0.04 + techIndex * 0.025,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`flex min-h-11 items-center gap-2.5 rounded-[var(--radius-control)] border px-3 transition-colors duration-200 ${TIER_CLASSES[tech.tier]}`}
                    >
                      <img
                        src={tech.icon}
                        alt=""
                        width={20}
                        height={20}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className="h-5 w-5 shrink-0 object-contain"
                      />
                      <span className="text-[13px] leading-none font-medium">
                        {tech.name}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
