export type Certification = {
  id: number;
  title: string;
  issuer: string;
  year: string;
  image?: string;
  credentialUrl?: string;
};

/**
 * Certifications carried over unchanged.
 *
 * Only the bootcamp entry has a real certificate scan in `public/`.
 * The other three originally pointed at files that were never added.
 * Showing the bootcamp image on the IBM and freeCodeCamp cards would
 * misrepresent the credential, so those records carry no `image` and
 * render the labelled fallback panel instead. That also means no
 * request is made for a file that does not exist.
 */
export const CERTIFICATIONS: Certification[] = [
  {
    id: 3,
    title: "IBM Cloud Essentials",
    issuer: "IBM",
    year: "2026",
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
    credentialUrl: "https://www.freecodecamp.org/certification",
  },
  {
    id: 4,
    title: "Responsive Web Design Certification",
    issuer: "freeCodeCamp",
    year: "2025",
    credentialUrl: "https://www.freecodecamp.org/certification",
  },
];
