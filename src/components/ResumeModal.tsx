import { motion, AnimatePresence } from "motion/react";
import { useEffect, useCallback } from "react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
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

          <motion.div
            className="relative flex flex-col items-end gap-2 w-[95vw] max-w-[900px]"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* ── Header row: label + close button ── */}
            <div className="w-full flex items-center justify-between px-1">
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                <span className="text-red-500">cat</span> resume.pdf
              </span>

              <button
                onClick={onClose}
                className="cursor-target w-9 h-9 rounded-full bg-neutral-900/90 border border-white/10 backdrop-blur-sm flex items-center justify-center text-neutral-400 hover:text-white hover:bg-red-500/30 hover:border-red-500/40 transition-all duration-200 shadow-lg"
                aria-label="Close resume modal"
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
            </div>

            {/* ── iframe box ── */}
            <div className="w-full h-[85vh] max-h-[800px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60">
              <iframe
                src="https://flowcv.com/resume/16j0i4s20nan"
                title="Edison Malasan — Resume"
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
