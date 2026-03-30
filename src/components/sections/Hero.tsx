import { Canvas } from "@react-three/fiber";
import Scene from "@/components/Scene";
import TrueFocus from "@/components/TrueFocus";
import { useRef } from "react";
import { Player } from "@lordicon/react";

import ICON_TALK from "../../assets/icons/talk.json";
import ICON_RESUME from "../../assets/icons/resume.json";

interface HeroProps {
  setBg: (colors: { background: string; fill: string }) => void;
}

export default function Hero({ setBg }: HeroProps) {
  const talkRef = useRef<Player>(null);
  const resumeRef = useRef<Player>(null);

  return (
    <section
      id="hero"
      className="flex flex-col md:flex-row items-center justify-between min-h-[70vh] md:min-h-[85vh] w-full relative pt-20 md:pt-30 px-4 sm:px-6 md:px-14 lg:px-20 overflow-hidden font-inter"
    >
      {/* LEFT SIDE */}
      <div className="flex flex-col items-start w-full md:w-[60%] z-10 justify-center py-6 md:py-10">
        {/* Terminal prompt replacing "Hello, I am" */}
        <p
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}
          className="pl-2 mb-1"
        >
          <span style={{ color: "#555" }}>edison@server:~$</span>{" "}
          <span style={{ color: "#e5e5e5" }}>cat</span>{" "}
          <span className="text-red-500">profile.md</span>
        </p>

        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: "#555",
          }}
          className="pl-2 mb-1"
        >
          &gt; loading profile...
        </p>

        <TrueFocus
          sentence="EDISON | MALASAN | FULL STACK DEVELOPER"
          separator="|"
          manualMode={false}
          blurAmount={0}
          borderColor="#ef4444"
          animationDuration={0.8}
          pauseBetweenAnimations={1}
          className="flex-col !items-start !gap-0"
          wordClassNames={[
            // EDISON
            `
            text-[clamp(2.5rem,7vw,8rem)]
            font-black font-[system-ui]
            leading-[0.88]
            tracking-[-0.04em]
            uppercase
            text-white
            drop-shadow-[0_0_30px_rgba(255,255,255,0.06)]
            transition-all duration-500
            hover:drop-shadow-[0_0_50px_rgba(239,68,68,0.2)]
            `,

            // MALASAN
            `
            text-[clamp(2.5rem,7vw,8rem)]
            font-black font-[system-ui]
            leading-[0.88]
            tracking-[-0.04em]
            uppercase
            bg-gradient-to-b from-gray-500 via-gray-600 to-gray-800
            bg-clip-text text-transparent
            transition-all duration-500
            hover:from-gray-400 hover:to-gray-700
            `,

            // ROLE
            `
            mt-4
            text-[clamp(0.65rem,1vw,0.9rem)]
            tracking-[0.45em]
            text-gray-500/80
            font-medium
            uppercase
            pl-2
            `,
          ]}
        />

        {/* Terminal-styled location */}
        <div className="flex flex-col gap-1 mt-6 md:mt-8 pl-2">
          <div className="flex items-center gap-4">
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                color: "#555",
              }}
            >
              edison@server:~$ <span style={{ color: "#e5e5e5" }}>whereis</span>{" "}
              <span style={{ color: "#e5e5e5" }}>edison</span>
            </p>
          </div>
          <p
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}
            className="text-red-500 pl-14"
          >
            /usr/bin/philippines
            <span className="cursor" />
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-6 md:mt-8 pl-2">
          <a
            href="#contact"
            className="
              group relative flex items-center gap-2 px-5 md:px-7 py-3 min-h-[44px]
              bg-red-500/10 text-white
              border border-red-700
              font-extrabold tracking-wider uppercase text-xs md:text-sm
              hover:bg-red-600
              transition-all duration-300
              hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]
              cursor-target
            "
            onMouseEnter={() => talkRef.current?.playFromBeginning()}
          >
            Let's Talk
            <Player
              ref={talkRef}
              icon={ICON_TALK}
              size={20}
              colors="primary:#ffffff"
            />
          </a>
          <a
            href="#"
            className="
              flex items-center gap-2 px-5 md:px-7 py-3 min-h-[44px]
              border-[1.5px] border-gray-700/80 text-gray-400
              hover:bg-white/5
              font-extrabold tracking-wider uppercase text-xs md:text-sm
              hover:border-gray-500 hover:text-gray-200
              transition-all duration-300
              hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]
              cursor-target
            "
            onMouseEnter={() => resumeRef.current?.playFromBeginning()}
          >
            <Player
              ref={resumeRef}
              icon={ICON_RESUME}
              size={18}
              colors="primary:#9ca3af"
            />
            VIEW RESUME
          </a>
        </div>
      </div>

      {/* RIGHT SIDE — 3D Canvas */}
      <div className="w-full md:w-[40%] h-[300px] sm:h-[400px] md:h-[650px] relative">
        <Canvas dpr={[1, 2]}>
          <Scene setBg={setBg} />
        </Canvas>
      </div>
    </section>
  );
}
