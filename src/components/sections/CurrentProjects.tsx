import { Github, Globe, Smartphone, Terminal } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import SmartImage from "@/components/ui/SmartImage";
import Tag from "@/components/ui/Tag";
import RepoBadge from "@/components/ui/RepoBadge";
import { CURRENT_PROJECTS } from "@/lib/projects";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "Web App": Globe,
  Website: Globe,
  "Mobile App": Smartphone,
  Script: Terminal,
};

/**
 * Current Projects: large feature rows with the image leading.
 *
 * Rows alternate their offset so the eye moves down the page rather
 * than reading a uniform grid.
 */
export default function CurrentProjects() {
  return (
    <section
      id="current-projects"
      aria-labelledby="current-title"
      className="scroll-mt-24 border-t border-line py-20 md:py-28"
    >
      <div className="shell">
        <SectionHeader
          as="h2"
          title={
            <span id="current-title">
              What I am
              <br />
              <span className="text-text-3">building right now</span>
            </span>
          }
          lede="Three projects in progress. Most repositories are private, so the descriptions are what I can share."
        />

        <div className="mt-12 flex flex-col gap-16 lg:mt-16 lg:gap-24">
          {CURRENT_PROJECTS.map((project, index) => {
            const Icon = CATEGORY_ICONS[project.categoryLabel] ?? Globe;
            const reversed = index % 2 === 1;

            return (
              <Reveal key={project.id}>
                <article
                  className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
                    reversed ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="overflow-hidden rounded-[var(--radius-container)] border border-line bg-surface-1">
                    <div className="aspect-16/10 w-full">
                      <SmartImage
                        src={project.image}
                        alt={`Preview of ${project.title}`}
                        width={1280}
                        height={800}
                        fallbackLabel={project.title}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-text-3">
                        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                        {project.categoryLabel}
                      </span>
                      {project.repoType ? (
                        <RepoBadge type={project.repoType} />
                      ) : null}
                    </div>

                    <h3 className="text-2xl leading-tight font-semibold md:text-3xl">
                      {project.title}
                    </h3>

                    <p className="max-w-[58ch] leading-relaxed text-text-2">
                      {project.shortDescription}
                    </p>

                    <ul className="mt-1 flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <li key={tech}>
                          <Tag>{tech}</Tag>
                        </li>
                      ))}
                    </ul>

                    {project.repoType === "public" && project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View the ${project.title} repository (opens in a new tab)`}
                        className="pressable mt-2 inline-flex min-h-11 w-fit items-center gap-2 rounded-[var(--radius-control)] border border-line-strong px-4 text-sm font-medium text-text-1 hover:bg-surface-1"
                      >
                        <Github className="h-4 w-4" aria-hidden="true" />
                        View repository
                      </a>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
