import { Globe3D, type GlobeMarker } from "../ui/3d-globe";
import SocialButton from "../kokonutui/social-button";
import { motion } from "motion/react";

export default function About() {
  const globeMarkers: GlobeMarker[] = [
    {
      lat: 16.4023,
      lng: 120.596,
      src: "src/assets/EdisonYellowBG.png",
      label: "Baguio City, Philippines",
    },
  ];

  const terminalFont = {
    fontFamily: "'JetBrains Mono', monospace",
  } as const;

  const infoLines: { label: string; value: string; highlight?: boolean }[] = [
    { label: "Status", value: "Computer Science Student" },
    { label: "University", value: "Saint Louis University" },
    { label: "Based in", value: "Baguio City, Philippines" },
    { label: "Focus", value: "Full-Stack Development" },
    {
      label: "Seeking",
      value: "Full-time & Part-time Opportunities",
      highlight: true,
    },
  ];

  return (
    <section id="about" className="relative w-full py-16 md:py-32 px-4 md:px-0">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-20">
        {/* LEFT SIDE: Content */}
        <div className="w-full md:w-1/2 flex flex-col z-10">
          {/* Section Label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <p
              style={{ ...terminalFont, fontSize: 12, letterSpacing: "0.1em" }}
            >
              <span style={{ color: "#555" }}>edison@server:~$</span>{" "}
              <span style={{ color: "#e5e5e5" }}>cd</span>{" "}
              <span className="text-red-500">/about-me</span>
            </p>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-1 mb-6"
          >
            <h3 className="text-neutral-500 font-medium text-lg md:text-xl tracking-tight">
              Hey there —
            </h3>
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] tracking-tighter uppercase">
              I'm{" "}
              <span className="relative inline-block">
                <span className="text-red-600 cursor-target">Edison</span>
                <motion.span
                  className="absolute -bottom-1.5 left-0 h-[3px] bg-red-500/20 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                />
              </span>
              <span className="text-red-600">.</span>
            </h2>
          </motion.div>
          {/* Terminal Info Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-5 mb-8 max-w-lg"
          >
            <div
              className="flex flex-col gap-3"
              style={{ ...terminalFont, fontSize: 13 }}
            >
              {infoLines.map((line, i) => (
                <div key={i} className="flex items-baseline gap-3">
                  <span className="text-neutral-600 min-w-[80px] sm:min-w-[90px] shrink-0 text-[11px] sm:text-[13px]">
                    {line.label}:
                  </span>
                  <span
                    className={`text-[11px] sm:text-[13px] ${
                      line.highlight
                        ? "text-red-500 font-semibold"
                        : "text-neutral-300"
                    }`}
                  >
                    {line.value}
                  </span>
                </div>
              ))}
              {/* Seeking detail */}
              <p
                className="text-neutral-500 text-xs mt-1 pl-[92px] sm:pl-[102px]"
                style={terminalFont}
              >
                Open to frontend or backend development roles and internships.
              </p>
            </div>
          </motion.div>

          {/* Uptime / Since line */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="pl-4 border-l-2 border-red-500/80 mb-8"
          >
            <p style={{ ...terminalFont, fontSize: 12, color: "#555" }}>
              <span style={{ color: "#555" }}>edison@server:~$</span>{" "}
              <span style={{ color: "#e5e5e5" }}>uptime -p</span>{" "}
            </p>
            <p
              className="text-neutral-400 mt-1"
              style={{ ...terminalFont, fontSize: 13 }}
            >
              Coding & Learning since{" "}
              <span className="text-red-500 font-bold">2022</span>
            </p>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <SocialButton />
          </motion.div>
        </div>

        {/* RIGHT SIDE: 3D Globe */}
        <div className="w-full md:w-1/2 h-[350px] sm:h-[450px] md:h-[700px] relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full h-full"
          >
            <Globe3D
              markers={globeMarkers}
              config={{
                radius: 2,
                showAtmosphere: false,
                autoRotateSpeed: 0.08,
                globeColor: "#171717",
                ambientIntensity: 1.2,
                pointLightIntensity: 2,
              }}
              onMarkerClick={(marker) => {
                console.log(marker.label);
              }}
              className="w-full h-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
