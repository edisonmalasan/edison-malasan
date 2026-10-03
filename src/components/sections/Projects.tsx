import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Github, Globe, Smartphone, Terminal, ExternalLink } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import SmartImage from "@/components/ui/SmartImage";
import Tag from "@/components/ui/Tag";
import RepoBadge from "@/components/ui/RepoBadge";
import { PROJECTS, PROJECT_CATEGORIES } from "@/lib/projects";
import { cn } from "@/lib/utils";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "Web App": Globe,
  Website: Globe,
  "Mobile App": Smartphone,
  Script: Terminal,
};

/**
 * Completed Projects: a filterable index.
 *
 * Changing the filter animates as a layout transition rather than a
 * crossfade, so the visitor can see which items stayed and which left.
 * All projects live in one view, replacing the previous carousel.
 */
export default function Projects() {
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState("All");

  const visible = useMemo(
    () =>
      filter === "All"
        ? PROJECTS
        : PROJECTS.filter((project) => project.categoryLabel === filter),
    [filter],
  );

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="scroll-mt-24 border-t border-line py-20 md:py-28"
    >
      <div className="shell">
        <SectionHeader
          as="h2"
          title={
            <span id="projects-title">
              Ten things
              <br />
              <span className="text-text-3">I have shipped</span>
            </span>
          }
          lede="Web apps, mobile apps, and automation scripts. Filter by type to narrow the list."
        />

        {/* Filters: real buttons, operable by keyboard */}
        <div
          role="group"
          aria-label="Filter projects by category"
          className="mt-10 flex flex-wrap gap-2"
        >
          {PROJECT_CATEGORIES.map((category) => {
            const isActive = filter === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                aria-pressed={isActive}
                className={cn(
                  "pressable min-h-11 rounded-[var(--radius-control)] border px-4 text-sm font-medium",
                  isActive
                    ? "border-[var(--accent-line)] bg-[var(--accent-quiet)] text-text-1"
                    : "border-line bg-surface-1 text-text-3 hover:border-line-strong hover:text-text-1",
                )}
              >
                {category}
              </button>
            );
          })}
        </div>

        <p className="mt-4 font-mono text-xs text-text-3" aria-live="polite">
          Showing{" "}
          <span className="tnum text-text-2">{visible.length}</span> of{" "}
          <span className="tnum text-text-2">{PROJECTS.length}</span> projects
        </p>


        {visible.length === 0 ? (
          <div className="mt-8 rounded-[var(--radius-container)] border border-dashed border-line-strong bg-surface-1 px-6 py-16 text-center">
            <p className="text-base text-text-2">
              No projects in this category yet.
            </p>
            <button
              type="button"
              onClick={() => setFilter("All")}
              className="pressable mt-4 inline-flex min-h-11 items-center rounded-[var(--radius-control)] border border-line-strong px-4 text-sm font-medium text-text-1 hover:bg-surface-1"
            >
              Show all projects
            </button>
          </div>
        ) : (
          <motion.ul
            layout
            className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((project) => {
                const Icon = CATEGORY_ICONS[project.categoryLabel] ?? Globe;
                const hasSource =
                  project.repoType === "public" && project.githubUrl;

                return (
                  <motion.li
                    key={project.id}
                    layout
                    initial={
                      reduceMotion ? false : { opacity: 0, scale: 0.97 }
                    }
                    animate={{ opacity: 1, scale: 1 }}
                    exit={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, scale: 0.97 }
                    }
                    transition={{
                      layout: { type: "spring", stiffness: 320, damping: 34 },
                      duration: 0.25,
                    }}
                    className="flex"
                  >
                    <article className="flex w-full flex-col overflow-hidden rounded-[var(--radius-container)] border border-line bg-surface-1 transition-colors duration-200 hover:border-line-strong">
                      <div className="aspect-16/10 w-full overflow-hidden bg-surface-2">
                        <SmartImage
                          src={project.image}
                          alt={`Preview of ${project.title}`}
                          width={1280}
                          height={800}
                          fallbackLabel={project.title}
                        />
                      </div>

                      <div className="flex flex-1 flex-col gap-3 p-5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-text-3">
                            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                            {project.categoryLabel}
                          </span>
                          {project.repoType ? (
                            <RepoBadge type={project.repoType} />
                          ) : null}
                        </div>

                        <h3 className="text-lg leading-tight font-semibold">
                          {project.title}
                        </h3>

                        <p className="text-sm leading-relaxed text-text-3">
                          {project.shortDescription}
                        </p>

                        <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                          {project.techStack.map((tech) => (
                            <li key={tech}>
                              <Tag>{tech}</Tag>
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-2 border-t border-line pt-4">
                          {hasSource ? (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`View the ${project.title} repository (opens in a new tab)`}
                              className="pressable inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-control)] border border-line px-3 text-sm text-text-2 hover:border-line-strong hover:text-text-1"
                            >
                              <Github className="h-4 w-4" aria-hidden="true" />
                              Source
                            </a>
                          ) : null}
                          {project.liveUrl ? (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Open the ${project.title} live site (opens in a new tab)`}
                              className="pressable inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-control)] border border-line px-3 text-sm text-text-2 hover:border-line-strong hover:text-text-1"
                            >
                              <ExternalLink
                                className="h-4 w-4"
                                aria-hidden="true"
                              />
                              Live site
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </article>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </motion.ul>
        )}
      </div>
    </section>
  );
}
