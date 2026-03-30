import { motion, AnimatePresence } from "motion/react";
import { useEffect, useCallback } from "react";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AppointmentModal({
  isOpen,
  onClose,
}: AppointmentModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/*
           * Outer wrapper: sits ABOVE the iframe and provides the close button
           * in the top-right corner of the BACKDROP — not on top of the iframe.
           * The close button is placed outside the iframe box entirely.
           */}
          <motion.div
            className="relative flex flex-col items-end gap-2 w-[95vw] max-w-[900px]"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* ── Close button — lives ABOVE the iframe, flush right ── */}
            <button
              onClick={onClose}
              className="w-9 h-9 cursor-target rounded-full bg-neutral-900/90 border border-white/10 backdrop-blur-sm flex items-center justify-center text-neutral-400 hover:text-white hover:bg-red-500/30 hover:border-red-500/40 transition-all duration-200 cursor-pointer shadow-lg"
              aria-label="Close appointment modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* ── iframe box ── */}
            <div className="w-full h-[90vh] lg:w-250 max-h-250 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60">
              <iframe
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3YPc5aagKrp6Fgrpb6S8-U31Bpo10DSuIlXV0abBqEVXHFdcQ-I1d4nhEVIP0Z8pfeZAPXKDou?gv=true"
                title="Book an appointment"
                className="w-full h-full border-0 bg-white"
                loading="lazy"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
