import { useState } from "react";
import StickyNav from "@/components/sections/StickyNav";
import TargetCursor from "@/components/TargetCursor";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import TechStack from "@/components/sections/TechStack";
import { Spotlight } from "@/components/ui/spotlight-new";
import ClickSpark from "@/components/ClickSpark";
import CurrentProjectSection from "./components/sections/CurrentProject";
import ProjectsSection from "./components/sections/Projects";
import CertificationSection from "./components/sections/Certification";
import Footer from "./components/sections/Footer";
import Preloader from "@/components/Preloader";
import AppointmentModal from "@/components/AppointmentModal";
import ResumeModal from "@/components/ResumeModal";

export default function App() {
  const [bg, setBg] = useState({
    background: "#000000",
    fill: "#271E37",
  });
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <>
      <Preloader minDisplayTime={2500} />
      <ClickSpark
        sparkColor="#fff"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        {/* Spotlight disabled on mobile/tablet */}
        <div className="hidden md:block">
          <Spotlight />
        </div>

        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: bg.background,
            zIndex: -1,
            overflow: "hidden",
            transition: "background 0.5s ease",
          }}
        >
          <div className="min-h-screen w-full bg-black relative overflow-hidden">
            <div
              className="absolute inset-0 z-0 pointer-events-none"
              style={{
                background: `
        radial-gradient(
          circle at center,
          rgba(59, 130, 246, 0.12) 0%,
          rgba(59, 130, 246, 0.06) 20%,
          rgba(0, 0, 0, 0.0) 60%
        )
      `,
              }}
            />
          </div>
        </div>
        <TargetCursor
          spinDuration={3}
          hideDefaultCursor={true}
          parallaxOn
          hoverDuration={0.2}
        />
        <StickyNav onOpenAppointment={() => setAppointmentOpen(true)} />
        <main className="mx-4 sm:mx-8 md:mx-[80px] lg:mx-[140px] px-3 relative z-10 text-white flex flex-col items-center transition-colors duration-500 overflow-x-hidden">
          {/* Blue Spotlight Background for all sections */}
          <div
            className="fixed inset-0 z-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(
                  circle at center,
                  rgba(59, 130, 246, 0.12) 0%,
                  rgba(59, 130, 246, 0.06) 20%,
                  rgba(0, 0, 0, 0.0) 60%
                )
              `,
            }}
          />
          <Hero setBg={setBg} onOpenAppointment={() => setAppointmentOpen(true)} onOpenResume={() => setResumeOpen(true)} />
          <About />
          <TechStack />
          <CurrentProjectSection />
          <ProjectsSection />
          <CertificationSection />
        </main>
        <Footer />
        <AppointmentModal
          isOpen={appointmentOpen}
          onClose={() => setAppointmentOpen(false)}
        />
        <ResumeModal
          isOpen={resumeOpen}
          onClose={() => setResumeOpen(false)}
        />
      </ClickSpark>
    </>
  );
}
