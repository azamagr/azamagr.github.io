import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle.jsx";

/**
 * Navbar
 * ---------------------------------------------------------------------------
 * Floating portfolio navbar for Muhammad Azam (Full Stack Developer).
 *
 *  - Fixed to the top, transparent at scroll position 0.
 *  - Once the user scrolls, background gains a blurred glass panel
 *    (backdrop-blur + translucent black) with a smooth transition.
 *  - Left: "Azam." logo, bold, white, with a bright red accent dot.
 *  - Center: nav links with a left-to-right underline hover animation
 *    (an animated span scaling on the x-axis from transform-origin left).
 *  - Right: glassmorphism "Hire Me" pill button with a soft red glow
 *    on hover.
 *  - Mobile: hamburger icon toggles a full-width red slide-down panel
 *    with large, touch-friendly nav items.
 *
 * Usage:
 *   <Navbar />
 * Place near the root of your layout, above your page content.
 */

const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile panel is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={[
          "fixed top-0 inset-x-0 z-[9999] transition-all duration-500",
          scrolled
            ? "bg-black/40 backdrop-blur-lg border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.25)]"
            : "bg-transparent border-b border-transparent",
        ].join(" ")}
      >
        <nav className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center font-black text-xl sm:text-2xl tracking-tight text-white"
          >
            Azam
            <span className="text-[#ff2a2a]">.</span>
          </a>

          {/* Center nav (desktop) */}
          <ul className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="group relative text-sm font-medium tracking-wide text-white/80 transition-colors duration-300 hover:text-white"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-[#ff2a2a] transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          {/* Hire Me CTA + Theme Toggle (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-[#ff2a2a]/60 hover:bg-white/15 hover:shadow-[0_0_25px_rgba(255,42,42,0.55)]"
            >
              Hire Me
            </a>
          </div>

          {/* Theme toggle + Hamburger (mobile) */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="relative z-[10000] flex h-9 w-9 flex-col items-center justify-center gap-[5px]"
            >
              <motion.span
                className="h-[2px] w-6 bg-white"
                animate={
                  mobileOpen
                    ? { rotate: 45, y: 7 }
                    : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.25 }}
              />
              <motion.span
                className="h-[2px] w-6 bg-white"
                animate={{ opacity: mobileOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="h-[2px] w-6 bg-white"
                animate={
                  mobileOpen
                    ? { rotate: -45, y: -7 }
                    : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.25 }}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile slide-down panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[9998] flex flex-col bg-white transition-colors duration-300 dark:bg-[#0a0a0a] md:hidden"
          >
            <ul className="mt-28 flex flex-1 flex-col items-center justify-start gap-2 px-6">
              {NAV_LINKS.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.35 }}
                  className="w-full"
                >
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMobileOpen(false)}
                    className="block w-full py-4 text-center text-3xl font-bold tracking-tight text-black transition-colors duration-300 hover:text-[#ff2a2a] active:opacity-60 dark:text-white"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}

              <motion.li
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + NAV_LINKS.length * 0.06, duration: 0.35 }}
                className="mt-4 w-full px-4"
              >
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full rounded-full border border-black/15 bg-black/5 py-4 text-center text-lg font-semibold text-black backdrop-blur-md transition-colors duration-300 hover:border-[#ff2a2a]/50 dark:border-white/40 dark:bg-white/10 dark:text-white"
                >
                  Hire Me
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
