/**
 * Site content, carried over unchanged from the pre-redesign sections.
 * Kept in one module so the sections render data rather than hold it.
 */

export const NAV_ITEMS = [
  { name: "About", link: "#about" },
  { name: "Tools", link: "#stack" },
  { name: "Projects", link: "#projects" },
  { name: "Certifications", link: "#certifications" },
] as const;

export const SECTION_IDS = NAV_ITEMS.map((item) => item.link.slice(1));

/** One label for the scheduling intent, used in nav, hero, and footer. */
export const CONTACT_LABEL = "Let's talk";

export const SOCIALS = [
  {
    label: "GitHub",
    url: "https://github.com/edisonmalasan",
    handle: "@edisonmalasan",
  },
  {
    label: "LinkedIn",
    url: "https://linkedin.com/in/edisonmalasan",
    handle: "in/edisonmalasan",
  },
  {
    label: "Facebook",
    url: "https://facebook.com/edison.malasan",
    handle: "edison.malasan",
  },
] as const;

export const EMAIL = "edisonmacaraegmalasan@gmail.com";

export const APPOINTMENT_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3YPc5aagKrp6Fgrpb6S8-U31Bpo10DSuIlXV0abBqEVXHFdcQ-I1d4nhEVIP0Z8pfeZAPXKDou?gv=true";

export const RESUME_URL = "https://flowcv.com/resume/16j0i4s20nan";

export const ABOUT_FACTS = [
  { label: "Status", value: "Computer Science Student" },
  { label: "University", value: "Saint Louis University" },
  { label: "Based in", value: "Baguio City, Philippines" },
  { label: "Focus", value: "Backend Development" },
  { label: "Seeking", value: "Full-time & Part-time Opportunities" },
] as const;

export const ABOUT_NOTE =
  "Open to frontend or backend development roles and internships.";

export const CODING_SINCE = "2022";

export const ABOUT_PROSE = [
  "I build web applications end to end, starting from the data model and API through to the interface people actually touch. Most of my work sits on the backend: Express services, relational and document databases, and the routing and architecture that keeps them maintainable.",
  "I work mostly in TypeScript and Java on the server, React on the client, with Python and Lua for automation scripts. I care about modular structure, because code that is easy to move is code that stays correct as a project grows.",
  "I am currently studying Computer Science at Saint Louis University in Baguio City, Philippines, and I am looking for full-time or part-time roles where I can keep learning on real problems.",
];
