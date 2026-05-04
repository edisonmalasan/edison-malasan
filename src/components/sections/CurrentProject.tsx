import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Globe,
  Smartphone,
  Terminal,
  ExternalLink,
  GithubIcon,
  ChevronLeft,
  ChevronRight,
  Lock,
  Unlock,
} from "lucide-react";
import SpotlightCard from "../SpotlightCard";

// ─── Types ───────────────────────────────────────────
interface Project {
  id: number;
  title: string;
  shortDescription: string;
  categoryLabel: string;
  image: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  repoType?: "public" | "private";
}

// ─── Repo Badge ───────────────────────────────────────
function RepoBadge({ type }: { type: "public" | "private" }) {
  const isPrivate = type === "private";
  return (
    <div
      className="relative flex items-center justify-center overflow-hidden flex-shrink-0"
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        padding: "4px 7px",
        borderRadius: 4,
        border: isPrivate
          ? "1px solid rgba(239,68,68,0.25)"
          : "1px solid rgba(255,255,255,0.08)",
        background: isPrivate
          ? "linear-gradient(90deg, rgba(239,68,68,0.12) 0%, rgba(239,68,68,0.04) 100%)"
          : "linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
      }}
    >
      {/* scanline shimmer */}
      <span
        className="pointer-events-none absolute inset-0"
        style={{
          background: isPrivate
            ? "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(239,68,68,0.03) 2px, rgba(239,68,68,0.03) 4px)"
            : "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)",
        }}
      />

      {isPrivate ? (
        <Lock
          className="relative w-3.5 h-3.5"
          style={{
            color: "rgba(239,68,68,0.85)",
            filter: "drop-shadow(0 0 4px rgba(239,68,68,0.5))",
          }}
        />
      ) : (
        <Unlock
          className="relative w-3.5 h-3.5"
          style={{ color: "rgba(255,255,255,0.28)" }}
        />
      )}
    </div>
  );
}

// ─── Current Project Data ────────────────────────────
const currentProjects: Project[] = [
  {
    id: 1,
    title: "Study Match",
    shortDescription:
      "AI Flashcard web application that generates flashcards based on user-provided topics using Groq API.",
    categoryLabel: "Web App",
    image: "/current-projects/placeholder.png",
    techStack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "Supabase",
      "Shadcn",
    ],
    githubUrl: "https://github.com/edisonmalasan/study-match-app",
    repoType: "private",
  },
  {
    id: 2,
    title: "MaftyCV",
    shortDescription:
      "A resume app builder that allows users to create and customize their resumes using a variety of templates",
    categoryLabel: "Web App",
    image: "/current-projects/placeholder.png",
    techStack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "Supabase",
      "Shadcn",
    ],
    githubUrl: "https://github.com/edisonmalasan/mafty-cv-app",
    repoType: "private",
  },
  {
    id: 3,
    title: "SAMCIS Marketplace",
    shortDescription:
      "A Progressive Web App marketplace project for School of Accountancy, Management, Computing and Information Studies (SAMCIS) by Integrated Confedaracy(ICON) with collabaration with Young Entrepreneurs Society(YES). This repository contains a frontend (React) and backend (Spring) used for development.",
    categoryLabel: "Web App",
    image: "/current-projects/ICON.png",
    techStack: [
      "Spring Boot",
      "React",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Docker",
      "JWT",
      "OAuth",
    ],
    githubUrl:
      "https://github.com/Integrated-Confederacy-ICON/samcis-marketplace",
    repoType: "private",
  },
];

// ─── Constants ───────────────────────────────────────
const PROJECTS_PER_PAGE = 3;
const MAX_TAGS = 4;
const totalPages = Math.ceil(currentProjects.length / PROJECTS_PER_PAGE);

const categoryIcon: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  "Web App": Globe,
  Website: Globe,
  "Mobile App": Smartphone,
  Script: Terminal,
};

// ─── Main Component ──────────────────────────────────
export default function CurrentProjectSection() {
  const [[page, direction], setPageState] = useState([1, 0]);
  const [expandedTags, setExpandedTags] = useState<Record<number, boolean>>({});

  const startIndex = (page - 1) * PROJECTS_PER_PAGE;
  const pageProjects = currentProjects.slice(
    startIndex,
    startIndex + PROJECTS_PER_PAGE,
  );

  const goToPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPageState([newPage, newPage > page ? 1 : -1]);
  };

  const toggleTags = (projectId: number) => {
    setExpandedTags((prev) => ({ ...prev, [projectId]: !prev[projectId] }));
  };

  return (
    <section
      id="current-projects"
      className="relative w-full py-16 md:py-32 px-4 md:px-0 overflow-hidden"
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
                <span className="text-red-500">./current-projects</span>
                <span className="cursor" />
              </p>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-5xl font-black text-white uppercase tracking-tighter"
            >
              CURRENT <span className="text-red-600">PROJECTS</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 shrink-0"
          >
            <span
              className="text-sm font-bold text-neutral-500 tabular-nums"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span className="text-white text-lg">[{page}</span>/{totalPages}]
            </span>

            {totalPages > 1 && (
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
            )}
          </motion.div>
        </div>

        {/* ── Project Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
          <AnimatePresence mode="popLayout" custom={direction} initial={false}>
            {pageProjects.map((project, i) => {
              const CatIcon = categoryIcon[project.categoryLabel] || Globe;
              const isExpanded = !!expandedTags[project.id];
              const hasOverflow = project.techStack.length > MAX_TAGS;
              const visibleTags = isExpanded
                ? project.techStack
                : project.techStack.slice(0, MAX_TAGS);
              const overflowCount = project.techStack.length - MAX_TAGS;

              return (
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
                    duration: 0.5,
                    delay: i * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <SpotlightCard
                    className="p-0 overflow-hidden group bg-neutral-900/50 border-white/[0.06]"
                    spotlightColor="rgba(185, 28, 28, 0.12)"
                  >
                    {/* ── Image ── */}
                    <div className="relative w-full h-48 overflow-hidden bg-neutral-800 flex-shrink-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-60" />

                      {/* Overlay Links */}
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {project.githubUrl && project.repoType === "public" && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener"
                            className="p-3 rounded-full bg-white/10 hover:bg-red-600 transition-colors cursor-target"
                          >
                            <GithubIcon className="w-5 h-5 text-white" />
                          </a>
                        )}
                        {project.liveUrl && project.repoType === "public" && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener"
                            className="p-3 rounded-full bg-white/10 hover:bg-red-600 transition-colors cursor-target"
                          >
                            <ExternalLink className="w-5 h-5 text-white" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* ── Body ── */}
                    <div className="p-4 sm:p-6 flex flex-col gap-3">
                      {/* Category and Repo Type */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <CatIcon className="w-4 h-4 text-red-500 flex-shrink-0" />
                          <span
                            className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 truncate"
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                            }}
                          >
                            --type=
                            {project.categoryLabel
                              .toLowerCase()
                              .replace(/\s+/g, "-")}
                          </span>
                        </div>

                        {project.repoType && (
                          <RepoBadge type={project.repoType} />
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white group-hover:text-red-500 transition-colors leading-tight">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-neutral-400 leading-relaxed line-clamp-2">
                        {project.shortDescription}
                      </p>

                      {/* ── Tech Stack ── */}
                      <div className="pt-2">
                        <div className="flex flex-wrap gap-2">
                          {visibleTags.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-neutral-400"
                            >
                              {tech}
                            </span>
                          ))}

                          {hasOverflow && (
                            <button
                              onClick={() => toggleTags(project.id)}
                              className="px-2 py-1 rounded text-[10px] font-mono cursor-pointer transition-colors duration-200 border
                              bg-red-500/10 border-red-500/20 text-red-400
                              hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-300"
                            >
                              {isExpanded
                                ? "− show less"
                                : `+${overflowCount} more`}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ── Progress Bar ── */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="w-32 h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-red-500 rounded-full"
                initial={false}
                animate={{ width: `${(page / totalPages) * 100}%` }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
