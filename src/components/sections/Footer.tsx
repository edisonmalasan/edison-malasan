import { Github, Linkedin, Facebook } from "lucide-react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Stack", href: "#stack" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const resourceLinks = [{ name: "Certifications", href: "#certifications" }];

const socials = [
  {
    icon: Github,
    label: "GitHub",
    url: "https://github.com/edisonmalasan",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    url: "https://linkedin.com/in/edisonmalasan",
  },
  {
    icon: Facebook,
    label: "Facebook",
    url: "https://facebook.com/edison.malasan",
  },
];

export default function Footer() {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="w-full border-t border-white/[0.06] mt-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 py-8">
        {/* Top Row — compact single line layout */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Left: Branding + tagline + socials */}
          <div className="flex flex-col gap-2.5">
            <h3 className="text-base font-black text-white tracking-tight">
              <span className="text-red-500">Edison</span> Malasan
            </h3>
            <p className="text-neutral-500 text-xs leading-relaxed">
              Always building, always improving.
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="cursor-target p-2 rounded-lg border border-white/[0.06] bg-white/[0.02] text-neutral-400 hover:text-red-500 hover:border-red-500/20 hover:bg-red-500/5 transition-all duration-300"
                >
                  <s.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right: Nav + Resources side by side */}
          <div className="flex gap-8 sm:gap-12">
            <div>
              <h4 className="text-[10px] font-bold text-white uppercase tracking-widest mb-3">
                Navigation
              </h4>
              <ul className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => scrollTo(e, link.href)}
                      className="cursor-target text-xs text-neutral-500 hover:text-red-500 transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-bold text-white uppercase tracking-widest mb-3">
                Resources
              </h4>
              <ul className="flex flex-col gap-2">
                {resourceLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => scrollTo(e, link.href)}
                      className="cursor-target text-xs text-neutral-500 hover:text-red-500 transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.06] my-6" />

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Terminal mail command */}
          <p
            className="break-all sm:break-normal"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
            }}
          >
            <span style={{ color: "#555" }}>edison@server:~$</span>{" "}
            <span style={{ color: "#f0f0f0" }}>mail -s "Hello"</span>{" "}
            <span style={{ color: "#e53535" }}>
              edisonmacaraegmalasan@gmail.com
            </span>
            <span className="footer-cursor" />
          </p>

          <div className="flex items-center gap-6">
            <p className="text-neutral-600 text-[10px] tracking-wide">
              © 2026 Edison Malasan
            </p>
            <p
              className="text-neutral-600 tracking-wide"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
              }}
            >
              built with React & Vite
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
