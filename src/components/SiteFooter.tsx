import { Github, Linkedin, Facebook, Mail, ArrowUpRight } from "lucide-react";
import { SOCIALS, EMAIL, CONTACT_LABEL, CODING_SINCE } from "@/lib/site";

const SOCIAL_ICONS = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Facebook: Facebook,
} as const;

type SiteFooterProps = {
  onOpenAppointment: () => void;
};

/**
 * Footer: identity, always-visible social links, contact action, and the
 * terminal motif, which appears here and in the hero only.
 */
export default function SiteFooter({ onOpenAppointment }: SiteFooterProps) {
  return (
    <footer className="mt-24 border-t border-line md:mt-32">
      <div className="shell py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-16">
          <div>
            <p className="text-lg font-semibold tracking-tight text-text-1">
              Edison Malasan
            </p>
            <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-text-3">
              Full stack developer building web applications from the data
              model through to the interface. Available for full-time and
              part-time roles.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
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
                    <span>{social.label}</span>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 md:items-end">
            <button
              type="button"
              onClick={onOpenAppointment}
              className="pressable inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-control)] bg-accent px-5 text-sm font-semibold whitespace-nowrap text-on-accent hover:bg-accent-hover"
            >
              {CONTACT_LABEL}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <a
              href={`mailto:${EMAIL}`}
              className="pressable inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-control)] px-1 text-sm text-text-2 hover:text-text-1"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              <span className="break-all">{EMAIL}</span>
            </a>
          </div>
        </div>

        {/* Terminal motif: reserved for the hero and the footer */}
        <div className="mt-10 border-t border-line pt-6">
          <p className="font-mono text-xs text-text-3">
            <span className="text-text-3">edison@server:~$</span>{" "}
            <span className="text-text-2">mail -s "Hello"</span>{" "}
            <span className="text-accent">{EMAIL}</span>
          </p>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-xs text-text-3">
              coding since {CODING_SINCE}
            </p>
            <p className="font-mono text-xs text-text-3">
              built with React, Vite, and Motion
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
