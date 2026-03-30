import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ExternalLink, Award } from "lucide-react";
import SpotlightCard from "../SpotlightCard";

// ─── Types ───────────────────────────────────────────
interface Certification {
  id: number;
  title: string;
  issuer: string;
  year: string;
  image: string;
  credentialUrl?: string;
}

// ─── Certification Data ──────────────────────────────
const certifications: Certification[] = [
  {
    id: 3,
    title: "IBM Cloud Essentials",
    issuer: "IBM",
    year: "2026",
    image: "/placeholder-ibm-cert.jpg",
    credentialUrl: "https://www.ibm.com/training/credentials",
  },
  {
    id: 1,
    title: "Dr. Angela Yu Web Development Bootcamp",
    issuer: "Udemy",
    year: "2025",
    image: "/certifications/angelayu-bootcamp.png",
    credentialUrl:
      "https://udemy-certificate.s3.amazonaws.com/pdf/UC-172f4a96-4119-4ea7-b9af-f9bd8c5f23af.pdf",
  },
  {
    id: 5,
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    year: "2025",
    image: "/placeholder-fcc-js-cert.jpg",
    credentialUrl: "https://www.freecodecamp.org/certification",
  },
  {
    id: 4,
    title: "Responsive Web Design Certification",
    issuer: "freeCodeCamp",
    year: "2025",
    image: "/placeholder-fcc-cert.jpg",
    credentialUrl: "https://www.freecodecamp.org/certification",
  },
];

const CERTS_PER_PAGE = 4;
const totalPages = Math.ceil(certifications.length / CERTS_PER_PAGE);

export default function CertificationSection() {
  const [page, setPage] = useState(1);
  const [direction, setDirection] = useState(0);

  const startIndex = (page - 1) * CERTS_PER_PAGE;
  const currentCerts = certifications.slice(
    startIndex,
    startIndex + CERTS_PER_PAGE,
  );
  const progressWidth = (page / totalPages) * 100;

  const goToPage = (next: number) => {
    if (next < 1 || next > totalPages) return;
    setDirection(next > page ? 1 : -1);
    setPage(next);
  };

  return (
    <section
      id="certifications"
      className="relative w-full py-16 md:py-32 px-4 md:px-0"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* ── Header Row ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 md:mb-10">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  letterSpacing: "0.1em",
                }}
              >
                <span style={{ color: "#555" }}>edison@server:~$</span>{" "}
                <span style={{ color: "#e5e5e5" }}>ls</span>{" "}
                <span className="text-red-500">./certifications</span>
                <span className="cursor" />
              </p>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-tight mb-2"
            >
              Proof of <span className="text-red-600">Growth</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-neutral-500 text-sm"
            >
              Recognition for continuous learning and skill development.
            </motion.p>
          </div>

          {/* Right: Page Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 shrink-0"
          >
            <span className="text-sm font-bold text-neutral-500 tabular-nums">
              <span className="text-white text-lg">
                {String(page).padStart(2, "0")}
              </span>
              <span className="mx-1.5">/</span>
              {String(totalPages).padStart(2, "0")}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
                className={`p-2 cursor-target rounded-lg border transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center ${
                  page === 1
                    ? "border-white/[0.06] text-neutral-700 cursor-not-allowed"
                    : "border-white/[0.08] text-neutral-400 hover:border-red-500/30 hover:text-red-500 hover:bg-red-500/5"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages}
                className={`p-2 cursor-target rounded-lg border transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center ${
                  page === totalPages
                    ? "border-white/[0.06] text-neutral-700 cursor-not-allowed"
                    : "border-white/[0.08] text-neutral-400 hover:border-red-500/30 hover:text-red-500 hover:bg-red-500/5"
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* ── Cert Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout" custom={direction} initial={false}>
            {currentCerts.map((cert, i) => (
              <motion.div
                key={i}
                layout
                custom={direction}
                variants={{
                  enter: (d: number) => ({
                    x: d > 0 ? 40 : -40,
                    opacity: 0,
                    filter: "blur(8px)",
                  }),
                  center: { x: 0, opacity: 1, filter: "blur(0px)" },
                  exit: (d: number) => ({
                    x: d > 0 ? -40 : 40,
                    opacity: 0,
                    filter: "blur(8px)",
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.35,
                  delay: i * 0.04,
                  ease: [0.25, 1, 0.5, 1],
                }}
              >
                <SpotlightCard
                  className="p-0 h-full overflow-hidden group border-white/[0.05]"
                  spotlightColor="rgba(185, 28, 28, 0.12)"
                >
                  <div className="relative w-full h-40 overflow-hidden bg-neutral-800">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      draggable={false}
                    />

                    {/* Glassmorphism Badge Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />

                    {cert.credentialUrl && (
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 backdrop-blur-[1px] transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="cursor-target p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-red-600 transition-all duration-200 shadow-xl"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </div>
                    )}

                    <div className="absolute top-3 left-3 z-10">
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider backdrop-blur-md bg-white/[0.03] text-red-500 border-white/[0.1]"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        <Award className="w-3 h-3" />
                        [VERIFIED]
                      </span>
                    </div>
                  </div>

                  <div className="p-5 min-h-[110px] bg-white/[0.01] backdrop-blur-[2px] border-t border-white/[0.05]">
                    {/* Title and Sub-title are now grouped together */}
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-[15px] font-bold text-white group-hover:text-red-500 transition-colors duration-300 leading-tight line-clamp-2">
                        {cert.title}
                      </h3>

                      <p className="text-[11px] text-neutral-500 font-medium uppercase tracking-wider">
                        {cert.issuer}
                        <span className="mx-1 text-neutral-800">•</span>
                        {cert.year}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ── Progress Bar ── */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="w-32 h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-red-500 rounded-full"
                initial={false}
                animate={{ width: `${progressWidth}%` }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
