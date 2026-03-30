"use client";

import { Facebook, Github, Linkedin, Link } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function SocialButton({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const shareButtons = [
    { icon: Github, label: "GitHub", url: "https://github.com/edisonmalasan" },
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
    { icon: Link, label: "Portfolio", url: "https://edisonmalasan.dev" },
  ];

  const handleShare = (index: number) => {
    setActiveIndex(index);
    window.open(shareButtons[index].url, "_blank");
    setTimeout(() => setActiveIndex(null), 300);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {/* Main Button */}
      <motion.div
        animate={{
          opacity: isVisible ? 0 : 1,
        }}
        transition={{
          duration: 0.2,
          ease: "easeInOut",
        }}
      >
        <button
          className={cn(
            "relative px-7 py-3",
            "bg-red-500/10",
            "text-white",
            "border border-red-700",
            "font-extrabold tracking-wider uppercase text-xs md:text-sm",
            "hover:bg-red-600",
            "transition-all duration-300",
            "hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]",
            className,
          )}
          {...props}
        >
          <span className="flex items-center gap-2">
            <Link className="h-4 w-4" strokeWidth={2.5} />
            FIND ME ON
          </span>
        </button>
      </motion.div>

      {/* Expandable Social Icons */}
      <motion.div
        animate={{
          width: isVisible ? "auto" : 0,
        }}
        className="absolute top-0 left-0 flex h-full overflow-hidden"
        transition={{
          duration: 0.3,
          ease: [0.23, 1, 0.32, 1],
        }}
      >
        {shareButtons.map((button, i) => (
          <motion.button
            animate={{
              opacity: isVisible ? 1 : 0,
              x: isVisible ? 0 : -20,
            }}
            aria-label={button.label}
            className={cn(
              "h-full",
              "w-11",
              "flex items-center justify-center",
              "bg-red-500/10",
              "text-red-400",
              "border-y border-red-700",
              i === 0 && "border-l border-red-700",
              i === shareButtons.length - 1 && "border-r border-red-700",
              "border-r border-red-700/40",
              "last:border-r last:border-red-700",
              "hover:bg-red-600",
              "hover:text-white",
              "outline-none",
              "relative overflow-hidden",
              "transition-all duration-300",
              "hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]",
              "cursor-target",
            )}
            key={`share-${button.label}`}
            onClick={() => handleShare(i)}
            transition={{
              duration: 0.3,
              ease: [0.23, 1, 0.32, 1],
              delay: isVisible ? i * 0.05 : 0,
            }}
            type="button"
          >
            <motion.div
              animate={{
                scale: activeIndex === i ? 0.85 : 1,
              }}
              className="relative z-10"
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            >
              <button.icon className="h-4 w-4" strokeWidth={2.5} />
            </motion.div>
            <motion.div
              animate={{
                opacity: activeIndex === i ? 0.2 : 0,
              }}
              className="absolute inset-0 bg-white"
              initial={{ opacity: 0 }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            />
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
