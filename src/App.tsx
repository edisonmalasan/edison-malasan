import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AppointmentOverlay from "@/components/AppointmentOverlay";
import ResumeOverlay from "@/components/ResumeOverlay";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Tools from "@/components/sections/Tools";
import CurrentProjects from "@/components/sections/CurrentProjects";
import Projects from "@/components/sections/Projects";
import Certifications from "@/components/sections/Certifications";

export default function App() {
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <div className="grain relative min-h-[100dvh]">
      {/* Skip link: first focusable element on the page */}
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <SiteHeader onOpenAppointment={() => setAppointmentOpen(true)} />

      {/* tabIndex -1 makes main a valid fragment target, so activating the
          skip link actually moves focus instead of only the hash. */}
      <main id="main" tabIndex={-1} className="relative z-[var(--z-base)]">
        <Hero
          onOpenAppointment={() => setAppointmentOpen(true)}
          onOpenResume={() => setResumeOpen(true)}
        />
        <About />
        <Tools />
        <CurrentProjects />
        <Projects />
        <Certifications />
      </main>

      <SiteFooter onOpenAppointment={() => setAppointmentOpen(true)} />

      <AppointmentOverlay
        isOpen={appointmentOpen}
        onClose={() => setAppointmentOpen(false)}
      />
      <ResumeOverlay isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}
