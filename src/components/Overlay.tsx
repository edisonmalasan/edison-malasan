import { useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const FOCUSABLE =
  'a[href], button:not([disabled]), iframe, input, select, textarea, [tabindex]:not([tabindex="-1"])';

type OverlayProps = {
  isOpen: boolean;
  onClose: () => void;
  /** Accessible name for the dialog. */
  label: string;
  /** Short monospace caption shown above the close control. */
  caption?: React.ReactNode;
  children: React.ReactNode;
};

/**
 * Shared overlay primitive.
 *
 * Implements focus trapping, focus restoration, Escape and backdrop
 * dismissal, scroll locking, and an accessible name in one place, so
 * both dialogs behave identically.
 */
export default function Overlay({
  isOpen,
  onClose,
  label,
  caption,
  children,
}: OverlayProps) {
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  // Remember the trigger so focus can return to it on close.
  useEffect(() => {
    if (isOpen) {
      restoreFocusRef.current = document.activeElement as HTMLElement | null;
    }
  }, [isOpen]);

  // Suspend background scrolling while open.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      // Trap focus: Tab wraps within the panel.
      if (event.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null || el.tagName === "IFRAME");

      if (focusable.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKeyDown);

    // Move focus into the panel once it exists.
    const timer = window.setTimeout(() => {
      const panel = panelRef.current;
      if (!panel) return;
      const first = panel.querySelector<HTMLElement>(FOCUSABLE);
      (first ?? panel).focus();
    }, 20);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(timer);
    };
  }, [isOpen, handleKeyDown]);

  // Restore focus to the trigger after the exit animation completes.
  const handleClosed = useCallback(() => {
    restoreFocusRef.current?.focus();
  }, []);

  const duration = reduceMotion ? 0 : 0.22;

  return (
    <AnimatePresence onExitComplete={handleClosed}>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[var(--z-overlay)] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration }}
        >
          <motion.div
            onClick={onClose}
            aria-hidden="true"
            className="absolute inset-0 bg-[color-mix(in_oklch,var(--surface-0)_78%,transparent)] backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration }}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 320, damping: 32 }
            }
            className={cn(
              "relative flex w-full max-w-4xl flex-col overflow-hidden",
              "rounded-[var(--radius-container)] border border-line-strong",
              "bg-surface-1 shadow-[var(--shadow-lg)]",
            )}
          >
            <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3">
              {caption ? (
                <span className="truncate font-mono text-xs text-text-3">
                  {caption}
                </span>
              ) : (
                <span />
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label={`Close ${label.toLowerCase()}`}
                className="pressable flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-control)] border border-line text-text-2 hover:border-line-strong hover:text-text-1"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="relative h-[70dvh] w-full bg-white md:h-[76dvh]">
              {children}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
