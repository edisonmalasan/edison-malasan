import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, CONTACT_LABEL, SECTION_IDS } from "@/lib/site";
import { cn } from "@/lib/utils";

const FOCUSABLE =
  'a[href], button:not([disabled]), iframe, input, select, textarea, [tabindex]:not([tabindex="-1"])';

type SiteHeaderProps = {
  onOpenAppointment: () => void;
};

/**
 * Sticky header: logo, primary navigation, and the single contact action.
 *
 * Active-section tracking uses an IntersectionObserver, and scroll
 * position is read through Motion, so neither writes to React state on
 * every frame.
 */
export default function SiteHeader({ onOpenAppointment }: SiteHeaderProps) {
  const [active, setActive] = useState<string>("");
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const isCondensed = latest > 24;
    // Only write state when the value actually flips.
    setCondensed((prev) => (prev === isCondensed ? prev : isCondensed));
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -55% 0px", threshold: 0 },
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // While the menu is open the page behind must not scroll, focus is
  // moved to the first link, Tab is trapped inside the panel, and Escape
  // returns focus to the trigger that opened it.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(
        menuPanelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [],
      ).filter((el) => el.offsetParent !== null);

    const timer = window.setTimeout(() => {
      focusables()[0]?.focus();
    }, 20);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) {
        event.preventDefault();
        menuButtonRef.current?.focus();
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      // The trigger button precedes the panel, so Shift+Tab from the
      // first link wraps back to it instead of escaping to the page.
      if (event.shiftKey && (active === first || !menuPanelRef.current?.contains(active))) {
        event.preventDefault();
        menuButtonRef.current?.focus();
      } else if (event.shiftKey && active === menuButtonRef.current) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const goTo = useCallback(
    (event: React.MouseEvent, link: string) => {
      event.preventDefault();
      const target = document.getElementById(link.slice(1));
      // Respect the reduced-motion preference: the CSS override only
      // covers CSS-driven scrolling, not this JS call.
      target?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    },
    [reduceMotion],
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[var(--z-header)]",
        "transition-[background-color,border-color] duration-300",
        condensed
          ? "border-b border-line bg-[color-mix(in_oklch,var(--surface-0)_84%,transparent)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="shell flex h-16 items-center justify-between gap-4 md:h-[72px]"
      >
        <a
          href="#hero"
          onClick={(e) => goTo(e, "#hero")}
          className="pressable flex min-h-11 shrink-0 items-center gap-2.5"
        >
          <img
            src="/logo.png"
            alt="Edison Malasan"
            width={32}
            height={32}
            className="h-8 w-8 rounded-[var(--radius-control)] object-cover"
          />
          <span className="hidden text-sm font-semibold tracking-tight text-text-1 sm:block">
            Edison Malasan
          </span>
        </a>

        {/* Desktop navigation, single line at every desktop width */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const id = item.link.slice(1);
            const isActive = active === id;
            return (
              <li key={item.name}>
                <a
                  href={item.link}
                  onClick={(e) => goTo(e, item.link)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative block rounded-[var(--radius-control)] px-3.5 py-2 min-h-11 flex items-center",
                    "text-sm font-medium transition-colors duration-200",
                    isActive ? "text-text-1" : "text-text-3 hover:text-text-1",
                  )}
                >
                  {item.name}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3.5 -bottom-0.5 h-px bg-accent"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  ) : null}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onOpenAppointment}
            className={cn(
              "pressable hidden min-h-11 rounded-[var(--radius-control)] px-4 py-2.5",
              "text-sm font-semibold whitespace-nowrap sm:block",
              "bg-accent text-on-accent hover:bg-accent-hover",
            )}
          >
            {CONTACT_LABEL}
          </button>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className={cn(
              "pressable flex h-11 w-11 items-center justify-center md:hidden",
              "rounded-[var(--radius-control)] border border-line text-text-1",
            )}
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={menuPanelRef}
        hidden={!menuOpen}
        className="border-t border-line bg-[color-mix(in_oklch,var(--surface-0)_96%,transparent)] backdrop-blur-xl md:hidden"
      >
        <ul className="shell flex flex-col py-3">
          {NAV_ITEMS.map((item) => {
            const id = item.link.slice(1);
            const isActive = active === id;
            return (
              <li key={item.name}>
                <a
                  href={item.link}
                  onClick={(e) => {
                    goTo(e, item.link);
                    setMenuOpen(false);
                    menuButtonRef.current?.focus();
                  }}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex min-h-11 items-center rounded-[var(--radius-control)] px-3",
                    "text-base font-medium transition-colors",
                    isActive ? "text-accent" : "text-text-2",
                  )}
                >
                  {item.name}
                </a>
              </li>
            );
          })}
          <li className="mt-2 sm:hidden">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onOpenAppointment();
              }}
              className="pressable min-h-11 w-full rounded-[var(--radius-control)] bg-accent px-3 text-base font-semibold text-on-accent"
            >
              {CONTACT_LABEL}
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
