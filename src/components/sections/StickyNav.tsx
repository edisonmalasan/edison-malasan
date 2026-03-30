"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Player } from "@lordicon/react";
import ICON_TALK from "../../assets/icons/talk.json";
import AppointmentModal from "@/components/AppointmentModal";
import StaggeredMenu from "@/components/StaggeredMenu";

const navItems = [
  { name: "About", link: "#about" },
  { name: "Stack", link: "#stack" },
  { name: "Projects", link: "#projects" },
  { name: "Certifications", link: "#certifications" },
];

export default function FloatingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const talkRef = useRef<Player>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Track active section
      const sections = navItems.map((item) => item.link.replace("#", ""));
      let found = "";
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            found = sections[i];
            break;
          }
        }
      }
      setActiveSection(found);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback(
    (
      e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
      link: string,
    ) => {
      e.preventDefault();
      if (link === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const id = link.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [],
  );

  return (
    <>
      {/* ── Desktop Navbar ── */}
      <div className="fixed top-0 inset-x-0 z-[5000] flex justify-center">
        <motion.nav
          animate={{
            maxWidth: scrolled ? 820 : 1280,
            marginTop: scrolled ? 20 : 12,
          }}
          transition={{ duration: 0.12, ease: [0.12, 1, 0.5, 1] }}
          className={cn(
            "w-full hidden md:flex items-center justify-between px-4 md:px-6 py-2.5 rounded-2xl backdrop-blur-xl border transition-all duration-400 mx-3 md:mx-0",
            scrolled
              ? "bg-neutral-950/80 border-white/[0.08] shadow-xl shadow-black/40"
              : "bg-neutral-950/40 border-white/[0.05] shadow-none",
          )}
        >
          {/* Logo */}
          <a
            href="#"
            className="cursor-target flex items-center py-1 shrink-0"
            onClick={(e) => scrollToSection(e, "#")}
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="h-8 w-auto hover:scale-105 transition-transform duration-300"
            />
          </a>

          {/* Center: Nav Items */}
          <div className="flex items-center gap-1.5">
            {navItems.map((item, idx) => (
              <a
                key={item.name}
                href={item.link}
                onClick={(e) => scrollToSection(e, item.link)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={cn(
                  "cursor-target relative px-4 py-2 text-[12px] font-bold uppercase tracking-[1.2px] transition-all duration-300 whitespace-nowrap",
                  activeSection === item.link.replace("#", "")
                    ? "text-red-500"
                    : hoveredIdx === idx
                      ? "text-white bg-white/[0.06]"
                      : "text-neutral-400 hover:text-neutral-200",
                )}
              >
                {item.name}
                {activeSection === item.link.replace("#", "") && (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-500"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Right: CTA Button */}
          <button
            onClick={() => setAppointmentOpen(true)}
            onMouseEnter={() => talkRef.current?.playFromBeginning()}
            className={cn(
              "cursor-target flex items-center gap-2.5 shrink-0",
              "rounded-xl px-5 py-2.5",
              "bg-red-500/15 text-red-400",
              "border border-red-500/20",
              "text-[12px] font-bold uppercase tracking-[1.2px]",
              "hover:bg-red-500/25 hover:border-red-500/40",
              "hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]",
              "transition-all duration-300 whitespace-nowrap",
            )}
          >
            <Player
              ref={talkRef}
              icon={ICON_TALK}
              size={18}
              colors="primary:#f87171"
            />
            Let's Talk
          </button>
        </motion.nav>
      </div>

      {/* ── Mobile/Tablet Staggered Menu ── */}
      <div className="md:hidden fixed top-0 left-0 w-screen h-screen z-[5000] pointer-events-none">
        <StaggeredMenu
          position="right"
          colors={["#0a0a0f", "#111118"]}
          accentColor="#ef4444"
          menuButtonColor="#e9e9ef"
          openMenuButtonColor="#ffffff"
          changeMenuColorOnOpen={true}
          isFixed={false}
          closeOnClickAway={true}
          logoUrl="/logo.png"
          displaySocials={false}
          displayItemNumbering={true}
          items={navItems.map((item) => ({
            label: item.name,
            ariaLabel: `Go to ${item.name}`,
            link: item.link,
          }))}
        />
      </div>

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={appointmentOpen}
        onClose={() => setAppointmentOpen(false)}
      />
    </>
  );
}
