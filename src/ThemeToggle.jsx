import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeContext";

/**
 * ThemeToggle
 * ---------------------------------------------------------------------------
 * Small pill/circle button that switches between dark and bright themes.
 * Drop it in the Navbar (next to "Hire Me") or anywhere else in the layout.
 *
 * Usage:
 *   <ThemeToggle />
 * Requires <ThemeProvider> higher up the tree (see ThemeContext.jsx).
 */

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to bright theme" : "Switch to dark theme"}
      className={`relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border transition-colors duration-300 ${
        isDark
          ? "border-white/20 bg-white/10 text-white hover:border-[#ff2a2a]/60"
          : "border-black/10 bg-black/5 text-black hover:border-[#ff2a2a]/60"
      } ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute"
          >
            <Moon className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute"
          >
            <Sun className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </motion.span>
        )}
      </AnimatePresence>

      {/* Soft glow ring on hover, tying back into the brand red */}
      <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 shadow-[0_0_18px_rgba(255,42,42,0.55)] transition-opacity duration-300 hover:opacity-100" />
    </button>
  );
}
