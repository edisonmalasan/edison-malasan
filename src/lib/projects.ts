/**
 * `image` is optional: the two private repositories have no public
 * screenshot, so those records omit it and render the labelled fallback
 * panel. Reusing a generic logo as a project preview would misrepresent
 * what the project looks like.
 */
export type Project = {
  id: number;
  title: string;
  shortDescription: string;
  categoryLabel: string;
  image?: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  repoType?: "public" | "private";
};

/** In-progress work. All three render in a single view, no pagination. */
export const CURRENT_PROJECTS: Project[] = [
  {
    id: 1,
    title: "Study Match",
    shortDescription:
      "AI Flashcard web application that generates flashcards based on user-provided topics using Groq API.",
    categoryLabel: "Web App",
    image: "/current-projects/ICON.png",
    techStack: ["React", "TypeScript", "Node.js", "Express", "Supabase", "Shadcn"],
    githubUrl: "https://github.com/edisonmalasan/study-match-app",
    repoType: "private",
  },
  {
    id: 2,
    title: "MaftyCV",
    shortDescription:
      "A resume app builder that allows users to create and customize their resumes using a variety of templates",
    categoryLabel: "Web App",
    techStack: ["React", "TypeScript", "Node.js", "Express", "Supabase", "Shadcn"],
    githubUrl: "https://github.com/edisonmalasan/mafty-cv-app",
    repoType: "private",
  },
  {
    id: 3,
    title: "SAMCIS Marketplace",
    shortDescription:
      "A Progressive Web App marketplace for the Saint Louis University ICON community, built with a Spring Boot service.",
    categoryLabel: "Web App",
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

/** Shipped work. All ten render in a single view, filtered by category. */
export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "NaviBites",
    shortDescription:
      "Full-stack food ordering system for university canteens with dual-login and vendor dashboards.",
    categoryLabel: "Web App",
    image: "/projects/navi-bites.png",
    techStack: ["React", "TypeScript", "Express", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/edisonmalasan/NaviBites",
    repoType: "public",
  },
  {
    id: 2,
    title: "Discord Auto Message + React",
    shortDescription:
      "Python automation script for messaging and reacting on Discord with smart rate limit handling.",
    categoryLabel: "Script",
    image: "/projects/python.png",
    techStack: ["Python", "Discord API", "REST"],
    githubUrl:
      "https://github.com/edisonmalasan/edison-scripts/tree/main/Discord/auto-message",
    repoType: "public",
  },
  {
    id: 3,
    title: "Discord Auto Reply",
    shortDescription:
      "Auto-reply script using WebSockets with memory tracking and auto-reconnect",
    categoryLabel: "Script",
    image: "/projects/python.png",
    techStack: ["Python", "WebSockets", "Discord API"],
    githubUrl:
      "https://github.com/edisonmalasan/edison-scripts/tree/main/Discord/auto-reply",
    repoType: "public",
  },
  {
    id: 4,
    title: "Growtopia Auto Cave Blast",
    shortDescription:
      "Fully automated cave blast gacha with anti-ban systems and Discord webhook reporting.",
    categoryLabel: "Script",
    image: "/projects/growtopia.png",
    techStack: ["Lua", "Discord Webhooks", "Pathfinding"],
    githubUrl: "https://github.com/edisonmalasan/growtopia-auto-caveblast",
    repoType: "private",
  },
  {
    id: 5,
    title: "Halperin Hotel",
    shortDescription:
      "Playing around with a UI concept that mixes luxurious Beverly Hills hotel vibes with Dead Island 2.",
    categoryLabel: "Website",
    image: "/projects/halperin-hotel.jpg",
    techStack: ["React", "Tailwind CSS", "Next.js", "SHADCN UI"],
    githubUrl: "https://github.com/edisonmalasan/halperin-hotel",
    repoType: "public",
  },
  {
    id: 7,
    title: "Identifruit",
    shortDescription:
      "AI-powered mobile app that identifies fruits through photos and shows nutritional info.",
    categoryLabel: "Mobile App",
    image: "/projects/identifruit.png",
    techStack: ["Kotlin", "Pytorch", "Firebase"],
    githubUrl: "https://github.com/edisonmalasan/IdentiFruit-App",
    repoType: "public",
  },
  {
    id: 6,
    title: "Fields M.D.",
    shortDescription:
      "Community-centered health portal for parents to access children's medical records in real-time.",
    categoryLabel: "Web App",
    image: "/projects/fields-md.png",
    techStack: ["PHP", "Laravel", "MySQL"],
    githubUrl: "https://github.com/edisonmalasan/HCI-Fields-MD",
    repoType: "public",
  },
  {
    id: 8,
    title: "Growtopia Auto Plant",
    shortDescription:
      "High-speed auto-planter script that scans a 100×52 world grid with auto-refill system.",
    categoryLabel: "Script",
    image: "/projects/growtopia.png",
    techStack: ["Lua", "Pathfinding", "Packet Handling"],
    githubUrl: "https://github.com/edisonmalasan/growtopia-auto-plant",
    repoType: "public",
  },
  {
    id: 9,
    title: "Growtopia Auto Spam",
    shortDescription:
      "Automated chat messaging script with randomized delays to mimic human typing patterns.",
    categoryLabel: "Script",
    image: "/projects/growtopia.png",
    techStack: ["Lua", "Packet Injection"],
    githubUrl: "https://github.com/edisonmalasan/growtopia-auto-spam",
    repoType: "public",
  },
  {
    id: 10,
    title: "Growtopia Rotation",
    shortDescription:
      "Multi-world farming automation handling harvesting and planting across multiple accounts.",
    categoryLabel: "Script",
    image: "/projects/growtopia.png",
    techStack: ["Lua", "Webhooks", "Multi-threading"],
    githubUrl: "https://github.com/edisonmalasan/growtopia-auto-rotation",
    repoType: "public",
  },
];

export const PROJECT_CATEGORIES = [
  "All",
  ...Array.from(new Set(PROJECTS.map((project) => project.categoryLabel))),
];
