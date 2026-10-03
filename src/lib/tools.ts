export type Tier = "S" | "A" | "B";

export type Tech = {
  name: string;
  tier: Tier;
  icon: string;
};

export type TechCategory = {
  title: string;
  items: Tech[];
};

// Devicon CDN base
const d = (slug: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}`;

export const TIER_LABELS: Record<Tier, string> = {
  S: "Primary",
  A: "Comfortable",
  B: "Learning",
};

/** Tier styling. Primary tier carries the accent; the rest stay neutral. */
export const TIER_CLASSES: Record<Tier, string> = {
  S: "border-[var(--accent-line)] bg-[var(--accent-quiet)] text-text-1",
  A: "border-line bg-surface-1 text-text-2",
  B: "border-dashed border-line-strong bg-transparent text-text-3",
};

/** Categories and tier assignments carried over unchanged. */
export const TECH_STACK: TechCategory[] = [
  {
    title: "Languages",
    items: [
      { name: "JavaScript", tier: "S", icon: d("javascript/javascript-original.svg") },
      { name: "TypeScript", tier: "S", icon: d("typescript/typescript-original.svg") },
      { name: "Lua", tier: "A", icon: d("lua/lua-original.svg") },
      { name: "Java", tier: "A", icon: d("java/java-original.svg") },
      { name: "Python", tier: "A", icon: d("python/python-original.svg") },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "React", tier: "S", icon: d("react/react-original.svg") },
      { name: "Tailwind", tier: "S", icon: d("tailwindcss/tailwindcss-original.svg") },
      { name: "Shadcn", tier: "S", icon: "https://ui.shadcn.com/apple-touch-icon.png" },
      { name: "Next.js", tier: "A", icon: d("nextjs/nextjs-original.svg") },
      { name: "Laravel", tier: "A", icon: d("laravel/laravel-original.svg") },
      { name: "Three.js", tier: "B", icon: d("threejs/threejs-original.svg") },
      { name: "GSAP", tier: "B", icon: "https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg" },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", tier: "S", icon: d("nodejs/nodejs-original.svg") },
      { name: "Express", tier: "S", icon: d("express/express-original.svg") },
      { name: "REST APIs", tier: "S", icon: d("fastapi/fastapi-original.svg") },
      { name: "Server Routing", tier: "S", icon: d("nodejs/nodejs-plain.svg") },
      { name: "Modular Architecture", tier: "B", icon: "/modular.png" },
    ],
  },
  {
    title: "Databases",
    items: [
      { name: "Prisma", tier: "S", icon: d("prisma/prisma-original.svg") },
      { name: "MySQL", tier: "S", icon: d("mysql/mysql-original.svg") },
      { name: "PostgreSQL", tier: "A", icon: d("postgresql/postgresql-original.svg") },
      { name: "MongoDB", tier: "A", icon: d("mongodb/mongodb-original.svg") },
    ],
  },
  {
    title: "Tooling",
    items: [
      { name: "Git", tier: "S", icon: d("git/git-original.svg") },
      { name: "GitHub", tier: "S", icon: d("github/github-original.svg") },
      { name: "Vite", tier: "S", icon: d("vitejs/vitejs-original.svg") },
      { name: "Postman", tier: "S", icon: d("postman/postman-original.svg") },
      { name: "Docker", tier: "A", icon: d("docker/docker-original.svg") },
    ],
  },
  {
    title: "Design",
    items: [
      { name: "Photoshop", tier: "S", icon: d("photoshop/photoshop-original.svg") },
      { name: "After Effects", tier: "S", icon: d("aftereffects/aftereffects-original.svg") },
    ],
  },
];
