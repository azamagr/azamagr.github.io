import React, { useRef } from "react";
import { motion, useScroll, useInView } from "framer-motion";
import { useTheme } from "./ThemeContext";

/**
 * ProcessTimeline
 * ---------------------------------------------------------------------------
 * "How I Work" scroll-driven process section.
 *
 *  - White background with a subtle light-gray grid (CSS background-image,
 *    no extra assets needed).
 *  - Header: small rounded "How I Work" badge, bold headline, and a
 *    hand-drawn-style sketch arrow (a wobbly inline SVG path) pointing at it.
 *  - A tall S-curve dashed line runs down the center. Its `pathLength` is
 *    bound to scroll progress via Framer Motion's useScroll, so it visually
 *    "grows" as the user scrolls through the section.
 *  - Four luggage-tag / conference-badge style cards, alternating left and
 *    right of the curve. Each card uses useInView (centered viewport band)
 *    to flip from white to bright red with a glowing shadow as the scroll
 *    position reaches it.
 *
 * Note on syncing: cards alternate left/right in a simple flex layout rather
 * than being pixel-locked to the curve's exact peaks — that keeps it robust
 * across screen sizes. If you want hard alignment to specific curve points,
 * position the curve as an SVG with fixed coordinates and place each card
 * with matching absolute top offsets instead.
 *
 * Usage:
 *   <ProcessTimeline />
 */

const STEPS = [
  {
    id: "01",
    title: "Define",
    desc: "Understanding requirements and system architecture (MVC, OOP).",
    align: "left",
  },
  {
    id: "02",
    title: "Design",
    desc: "Crafting responsive UI/UX using React.js, Bootstrap, and Tailwind.",
    align: "right",
  },
  {
    id: "03",
    title: "Build",
    desc: "Developing robust REST APIs with Node.js, Express.js, and MongoDB.",
    align: "left",
  },
  {
    id: "04",
    title: "Launch",
    desc: "Testing, version control via Git/GitHub, and deploying scalable web solutions.",
    align: "right",
  },
];

export default function ProcessTimeline() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.75", "end 0.4"],
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-28 transition-colors duration-300 dark:bg-[#0a0a0a] sm:py-36"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(128,128,128,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(128,128,128,0.08) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
      }}
    >
      {/* Header */}
      <div className="relative z-10 mx-auto mb-24 max-w-3xl px-6 text-center sm:px-10">
        <span className="inline-block rounded-full border border-black/10 bg-black/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-black/70 dark:border-white/15 dark:bg-white/5 dark:text-white/60">
          How I Work
        </span>

        <div className="relative mt-6 inline-block">
          <h2 className="text-4xl font-black leading-tight tracking-tight text-black transition-colors duration-300 dark:text-white sm:text-5xl">
            Let us show you how we drive your brand to new heights
          </h2>
          <SketchArrow className="absolute -right-14 -top-8 hidden h-16 w-16 text-[#ff2a2a] sm:block" />
        </div>
      </div>

      {/* Timeline */}
      <div className="relative mx-auto max-w-4xl px-6 sm:px-10">
        {/* Growing S-curve, centered behind the cards */}
        <svg
          className="pointer-events-none absolute left-1/2 top-0 h-full w-40 -translate-x-1/2 sm:w-56"
          viewBox="0 0 200 1000"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M100,0 C185,120 15,220 100,340 C185,460 15,560 100,680 C185,800 15,900 100,1000"
            stroke="currentColor"
            className="text-black/15 dark:text-white/15"
            strokeWidth="3"
            strokeDasharray="10 10"
            strokeLinecap="round"
          />
          <motion.path
            d="M100,0 C185,120 15,220 100,340 C185,460 15,560 100,680 C185,800 15,900 100,1000"
            stroke="#ff2a2a"
            strokeWidth="3"
            strokeDasharray="10 10"
            strokeLinecap="round"
            style={{ pathLength: scrollYProgress }}
          />
        </svg>

        {/* Cards */}
        <div className="relative z-10 flex flex-col gap-28 sm:gap-36">
          {STEPS.map((step) => (
            <ProcessCard key={step.id} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */

function ProcessCard({ id, title, desc, align }) {
  const ref = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  // "Active" once the card sits roughly in the center band of the viewport
  const inView = useInView(ref, { margin: "-42% 0px -42% 0px" });

  const baseBg = isDark ? "#171717" : "#ffffff";

  return (
    <div
      className={`flex w-full ${
        align === "left" ? "justify-start" : "justify-end"
      }`}
    >
      <motion.div
        ref={ref}
        animate={{
          backgroundColor: inView ? "#ff2a2a" : baseBg,
          boxShadow: inView
            ? "0 0 50px rgba(255,42,42,0.55), 0 20px 40px rgba(0,0,0,0.15)"
            : isDark
            ? "0 10px 30px rgba(0,0,0,0.4)"
            : "0 10px 30px rgba(0,0,0,0.08)",
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-[85%] max-w-xs rounded-2xl border border-black/10 px-6 pb-6 pt-5 dark:border-white/10 sm:max-w-sm"
      >
        {/* Hole-punch detail, like a luggage tag / badge */}
        <div
          className={`absolute -top-3 h-6 w-6 rounded-full border-4 border-white dark:border-[#0a0a0a] ${
            align === "left" ? "left-6" : "right-6"
          }`}
          style={{ backgroundColor: inView ? "#ff2a2a" : isDark ? "#333333" : "#e5e5e5" }}
        />

        <span
          className={`text-xs font-black tracking-[0.2em] transition-colors duration-300 ${
            inView ? "text-white/70" : isDark ? "text-white/40" : "text-black/40"
          }`}
        >
          {id}
        </span>
        <h3
          className={`mt-1 text-2xl font-black tracking-tight transition-colors duration-300 ${
            inView ? "text-white" : isDark ? "text-white" : "text-black"
          }`}
        >
          {title}
        </h3>
        <p
          className={`mt-2 text-sm leading-relaxed transition-colors duration-300 ${
            inView ? "text-white/90" : isDark ? "text-white/60" : "text-black/60"
          }`}
        >
          {desc}
        </p>
      </motion.div>
    </div>
  );
}

function SketchArrow({ className = "" }) {
  // A loose, hand-drawn-feeling squiggly arrow pointing at the headline.
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M8 70 C 25 75, 30 40, 48 45 C 62 48, 58 20, 78 15"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        d="M62 12 L79 15 L73 30"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  );
}
