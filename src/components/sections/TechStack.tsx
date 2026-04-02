import { motion } from "motion/react";
import SpotlightCard from "../SpotlightCard";

type Tier = "S" | "A" | "B";

interface Tech {
  name: string;
  tier: Tier;
  icon: string;
}

interface Category {
  title: string;
  items: Tech[];
}

// Devicon CDN base
const d = (slug: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}`;

const techStack: Category[] = [
  {
    title: "Languages",
    items: [
      {
        name: "JavaScript",
        tier: "S",
        icon: d("javascript/javascript-original.svg"),
      },
      {
        name: "TypeScript",
        tier: "S",
        icon: d("typescript/typescript-original.svg"),
      },
      { name: "Lua", tier: "A", icon: d("lua/lua-original.svg") },
      { name: "Java", tier: "A", icon: d("java/java-original.svg") },
      { name: "Python", tier: "A", icon: d("python/python-original.svg") },
    ],
  },
  {
    title: "Frontend & Frameworks",
    items: [
      { name: "React", tier: "S", icon: d("react/react-original.svg") },
      {
        name: "Tailwind",
        tier: "S",
        icon: d("tailwindcss/tailwindcss-original.svg"),
      },
      {
        name: "Shadcn",
        tier: "S",
        icon: "https://ui.shadcn.com/apple-touch-icon.png",
      },
      { name: "Next.js", tier: "A", icon: d("nextjs/nextjs-original.svg") },
      { name: "Laravel", tier: "A", icon: d("laravel/laravel-original.svg") },
      { name: "Three.js", tier: "B", icon: d("threejs/threejs-original.svg") },
      {
        name: "GSAP",
        tier: "B",
        icon: "https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg",
      },
    ],
  },
  {
    title: "Backend & Architecture",
    items: [
      { name: "Node.js", tier: "S", icon: d("nodejs/nodejs-original.svg") },
      { name: "Express", tier: "S", icon: d("express/express-original.svg") },
      { name: "REST APIs", tier: "S", icon: d("fastapi/fastapi-original.svg") },
      { name: "Server Routing", tier: "S", icon: d("nodejs/nodejs-plain.svg") },
      {
        name: "Modular Architecture",
        tier: "B",
        icon: "/modular.png",
      },
    ],
  },
  {
    title: "Databases & ORM",
    items: [
      { name: "Prisma", tier: "S", icon: d("prisma/prisma-original.svg") },
      { name: "MySQL", tier: "S", icon: d("mysql/mysql-original.svg") },
      {
        name: "PostgreSQL",
        tier: "A",
        icon: d("postgresql/postgresql-original.svg"),
      },
      { name: "MongoDB", tier: "A", icon: d("mongodb/mongodb-original.svg") },
    ],
  },
  {
    title: "Tooling & Workflow",
    items: [
      { name: "Git", tier: "S", icon: d("git/git-original.svg") },
      { name: "GitHub", tier: "S", icon: d("github/github-original.svg") },
      { name: "Vite", tier: "S", icon: d("vitejs/vitejs-original.svg") },
      { name: "Postman", tier: "S", icon: d("postman/postman-original.svg") },
      { name: "Docker", tier: "A", icon: d("docker/docker-original.svg") },
    ],
  },
  {
    title: "Digital Design Suite",
    items: [
      {
        name: "Photoshop",
        tier: "S",
        icon: d("photoshop/photoshop-original.svg"),
      },
      {
        name: "After Effects",
        tier: "S",
        icon: d("aftereffects/aftereffects-original.svg"),
      },
    ],
  },
];

const tierConfig: Record<Tier, { chip: string; dot: string }> = {
  S: {
    chip: "bg-red-500/10 border-red-500/20 text-red-400",
    dot: "bg-red-500 shadow-[0_0_6px_rgba(220,38,38,0.4)]",
  },
  A: {
    chip: "bg-white/[0.04] border-white/10 text-neutral-300",
    dot: "bg-neutral-400",
  },
  B: {
    chip: "bg-transparent border-white/15 border-dashed text-neutral-400",
    dot: "bg-neutral-500",
  },
};

export default function TechStack() {
  return (
    <section id="stack" className="relative w-full py-16 md:py-32 px-4 md:px-0">
      <div className="max-w-[1400px] mx-auto">
        {/* ── Header ── */}
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
            <span style={{ color: "#e5e5e5" }}>cat</span>{" "}
            <span className="text-red-500">tools.md</span>
            <span className="cursor" />
          </p>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-tight mb-6"
        >
          Tools I <span className="text-red-600">Work</span> With
        </motion.h2>

        {/* ── Legend ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center gap-2 sm:gap-4 mb-8 md:mb-10"
        >
          {(
            [
              ["S", "--primary"],
              ["A", "--comfortable"],
              ["B", "--learning"],
            ] as [Tier, string][]
          ).map(([tier, label]) => (
            <div
              key={tier}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-[11px] font-semibold tracking-wide uppercase ${tierConfig[tier].chip}`}
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span
                className={`w-2 h-2 rounded-full ${tierConfig[tier].dot}`}
              />
              {label}
            </div>
          ))}
        </motion.div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {techStack.map((cat, catIdx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 + catIdx * 0.06 }}
            >
              <SpotlightCard
                className="p-5 h-full"
                spotlightColor="rgba(185, 28, 28, 0.15)"
              >
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-4">
                  {cat.title}
                </h3>

                <div className="flex flex-wrap gap-3">
                  {cat.items.map((tech, techIdx) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.92 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.12 + catIdx * 0.04 + techIdx * 0.03,
                      }}
                      className={`
                        flex flex-col items-center justify-center gap-1.5 sm:gap-2
                        w-[4.5rem] min-h-[4.5rem] sm:w-[5.5rem] sm:min-h-[5.5rem] rounded-2xl border
                        text-[10px] sm:text-[11px] font-semibold
                        transition-all duration-300
                        hover:scale-[1.06] cursor-default
                        ${tierConfig[tech.tier].chip}
                      `}
                    >
                      <img
                        src={tech.icon}
                        alt={tech.name}
                        className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                        draggable={false}
                      />
                      <span className="text-center px-1 leading-tight break-words w-full">
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
