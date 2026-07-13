import React, { useRef, useState } from "react";
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
    desc: "I start by understanding the real problem — gathering requirements, mapping user flows, and planning the system architecture around MVC and OOP principles so the codebase stays organized and easy to scale from day one.",
    align: "left",
  },
  {
    id: "02",
    title: "Design",
    desc: "Wireframes turn into responsive, accessible interfaces built with React.js, Bootstrap, and Tailwind CSS — focused on clean layout, consistent spacing, and interactions that feel intuitive across every screen size.",
    align: "right",
  },
  {
    id: "03",
    title: "Build",
    desc: "The frontend gets connected to a robust backend — REST APIs built with Node.js and Express.js, data modeled and persisted in MongoDB, with authentication, validation, and error handling wired in from the start.",
    align: "left",
  },
  {
    id: "04",
    title: "Launch",
    desc: "Every feature is tested, code is versioned and reviewed through Git/GitHub, and the final build is deployed to a scalable hosting environment — with monitoring in place so it keeps running smoothly after launch.",
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

        <HeadlineWithArrow />
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
      className={`flex w-full flex-col gap-4 ${
        align === "left" ? "items-start" : "items-end"
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
        className="relative w-fit rounded-2xl border border-black/10 px-8 py-5 dark:border-white/10"
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
          className={`mt-1 whitespace-nowrap text-2xl font-black tracking-tight transition-colors duration-300 ${
            inView ? "text-white" : isDark ? "text-white" : "text-black"
          }`}
        >
          {title}
        </h3>
      </motion.div>

      {/* Description sits outside the compact tag, with room to breathe */}
      <p
        className={`max-w-sm text-sm leading-relaxed transition-colors duration-300 sm:max-w-md ${
          align === "left" ? "text-left" : "text-right"
        } ${isDark ? "text-white/60" : "text-black/60"}`}
      >
        {desc}
      </p>
      <p
  className={`max-w-sm text-sm leading-relaxed ...`}
>
  {desc}
</p>
    </div>
  );
}

function HeadlineWithArrow() {
  const wrapRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // Normalize cursor position within the block to a small tilt/offset range
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    setPos({ x: relX * 16, y: relY * 16 });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className="relative mt-6 inline-block"
    >
      <h2 className="text-4xl font-black leading-tight tracking-tight text-black transition-colors duration-300 dark:text-white sm:text-5xl">
        Let us show you how we drive your brand to new heights
      </h2>
      <SketchArrow
        pos={pos}
        className="absolute -right-14 -top-8 hidden h-16 w-16 text-[#ff2a2a] sm:block"
      />
    </div>
  );
}

function SketchArrow({ className = "", pos = { x: 0, y: 0 } }) {
  // Draws itself in once scrolled into view, then actually follows the
  // cursor as it moves around the headline (not a fixed auto-loop).
  return (
    <motion.svg
      viewBox="0 0 100 110"
      fill="none"
      className={className}
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ x: pos.x, y: pos.y, rotate: pos.x * 0.8 }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.4 }}
    >
      {/* Curled squiggle body */}
      <motion.path
        d="M8 92 C 4 68, 30 78, 28 56 C 26 34, 55 46, 50 24 C 47 10, 60 4, 70 10"
        stroke="currentColor"
        strokeWidth="3.5"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
      />
      {/* Arrowhead */}
      <motion.path
        d="M56 6 L71 10 L64 24"
        stroke="currentColor"
        strokeWidth="3.5"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 1.05 }}
      />
    </motion.svg>
  );
}
