import { useTheme } from "@/components/theme-provider";
import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";

const ModeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-center gap-10">
      {/* Color Switcher */}
      <div
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="group relative h-[84px] w-9 bg-black/25 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full flex flex-col justify-between py-3 items-center transition-colors hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
      >
        {/* Ghost Indicators (Background) */}
        <div className="opacity-20">
          <Moon size={12} className="text-black dark:text-white fill-current" />
        </div>

        <div className="opacity-20">
          <Sun size={12} className="text-black dark:text-white fill-current" />
        </div>

        {/* Animated Handle (Switch) */}
        <motion.div
          animate={{
            y: theme === "dark" ? -4 : 44, // Perfectly centers over the ghost icons
          }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="absolute top-2 w-7 h-7 bg-white dark:bg-white/20 border border-neutral-300 dark:border-white/20 rounded-full shadow-md dark:shadow-none flex items-center justify-center backdrop-blur-md pointer-events-none"
        >
          {theme === "dark" ? (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Moon
                size={14}
                className="text-black dark:text-white fill-current"
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Sun
                size={14}
                className="text-black dark:text-white fill-current"
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ModeToggle;
