import { Github, Linkedin, Facebook } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import {
  ABOUT_FACTS,
  ABOUT_NOTE,
  ABOUT_PROSE,
  CODING_SINCE,
  SOCIALS,
} from "@/lib/site";

const SOCIAL_ICONS = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Facebook: Facebook,
} as const;

/**
 * About: a sticky facts rail beside a prose column.
 *
 * The facts list is deliberately narrow so the prose column stays the
 * widest element and the eye lands on the writing first.
 */
export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="scroll-mt-24 border-t border-line py-20 md:py-28"
    >
      <div className="shell">
        <SectionHeader
          as="h2"
          title={
            <span id="about-title">
              A developer who works
              <br />
              <span className="text-text-3">mostly on the server</span>
            </span>
          }
          lede="I like the parts of a project that decide how everything else fits together."
        />

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,17rem)_1fr] lg:gap-16">
          {/* Facts rail: sticks alongside the prose on wide screens */}
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[var(--radius-container)] border border-line bg-surface-1 p-5">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-3">
                Details
              </h3>

              <dl className="mt-4 flex flex-col gap-3">
                {ABOUT_FACTS.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex flex-col gap-0.5 border-b border-line pb-3 last:border-0 last:pb-0"
                  >
                    <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-3">
                      {fact.label}
                    </dt>
                    <dd className="text-sm leading-snug text-text-1">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-4 text-xs leading-relaxed text-text-3">
                {ABOUT_NOTE}
              </p>

              <div className="mt-5 border-t border-line pt-4">
                <p className="font-mono text-xs text-text-3">
                  coding since{" "}
                  <span className="tnum text-accent">{CODING_SINCE}</span>
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {SOCIALS.map((social) => {
                const Icon = SOCIAL_ICONS[social.label];
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label} (opens in a new tab)`}
                    className="pressable flex min-h-11 items-center gap-2 rounded-[var(--radius-control)] border border-line bg-surface-1 px-3.5 text-sm text-text-2 hover:border-line-strong hover:text-text-1"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <span>{social.handle}</span>
                  </a>
                );
              })}
            </div>
          </Reveal>

          {/* Prose column */}
          <Reveal delay={0.08}>
            <div className="flex flex-col gap-6">
              {ABOUT_PROSE.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="max-w-[65ch] text-base leading-[1.75] text-text-2"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
