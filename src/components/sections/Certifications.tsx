import { Award, ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import SmartImage from "@/components/ui/SmartImage";
import { CERTIFICATIONS } from "@/lib/certifications";

/**
 * Certifications: a continuous grid, no pagination.
 *
 * Four entries fit in one view, so the previous carousel only hid them
 * behind chevrons. Each card links to its credential.
 */
export default function Certifications() {
  return (
    <section
      id="certifications"
      aria-labelledby="certs-title"
      className="scroll-mt-24 border-t border-line py-20 md:py-28"
    >
      <div className="shell">
        <SectionHeader
          as="h2"
          title={
            <span id="certs-title">
              Proof of
              <br />
              <span className="text-text-3">continued learning</span>
            </span>
          }
          lede="Formal certifications alongside the practical work. Every card links to its credential."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {CERTIFICATIONS.map((cert, index) => (
            <li key={cert.id} className="h-full list-none">
              <Reveal delay={index * 0.06} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-container)] border border-line bg-surface-1 transition-colors duration-200 hover:border-line-strong">
                  <div className="relative aspect-3/2 w-full overflow-hidden bg-surface-2">
                    <SmartImage
                      src={cert.image}
                      alt={`Certificate: ${cert.title}`}
                      width={960}
                      height={640}
                      fallbackLabel={cert.issuer}
                    />
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-[var(--radius-control)] border border-line bg-[color-mix(in_oklch,var(--surface-0)_78%,transparent)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-text-2 backdrop-blur-md">
                      <Award className="h-3 w-3" aria-hidden="true" />
                      Verified
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <h3 className="text-[15px] leading-snug font-semibold">
                      {cert.title}
                    </h3>
                    <p className="font-mono text-xs text-text-3">
                      {cert.issuer}
                      <span className="mx-2 text-text-3" aria-hidden="true">
                        /
                      </span>
                      <span className="tnum">{cert.year}</span>
                    </p>

                    {cert.credentialUrl ? (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View the ${cert.title} credential (opens in a new tab)`}
                        className="pressable mt-auto inline-flex min-h-11 items-center gap-1.5 pt-2 text-sm font-medium text-text-2 hover:text-text-1"
                      >
                        View credential
                        <ArrowUpRight
                          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </a>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
