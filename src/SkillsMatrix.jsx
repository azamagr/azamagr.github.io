import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeContext";

/**
 * SkillsMatrix
 * ---------------------------------------------------------------------------
 * "Technical Expertise" dashboard — category boxes of pill tags instead of
 * progress bars.
 *
 *  - Four category boxes: Frontend, Backend, Databases, Tools/Concepts.
 *  - Each pill scales up and turns bright red (#ff2a2a) on hover, and shows
 *    a small floating tooltip card above it with a relevant certification
 *    or concept note (e.g. Node.js → "freeCodeCamp Certified Back-End
 *    Developer 2025").
 *  - Boxes and pills stagger-fade into view via whileInView, so the whole
 *    section animates in once scrolled into the viewport (once: true, so
 *    it doesn't replay on every scroll pass).
 *
 * Usage:
 *   <SkillsMatrix />
 */

const CATEGORIES = [
  {
    name: "Frontend",
    items: [
      { name: "React.js", note: "Built production UIs across 6+ MERN projects" },
      { name: "Tailwind CSS", note: "Utility-first styling for responsive layouts" },
      { name: "Bootstrap", note: "Rapid responsive prototyping" },
      { name: "JavaScript (ES6+)", note: "Core language for all frontend work" },
    ],
  },
  {
    name: "Backend",
    items: [
      { name: "Node.js", note: "freeCodeCamp Certified Back-End Developer 2025" },
      { name: "Express.js", note: "REST API design across every backend project" },
      { name: "JWT", note: "Auth & role-based access in Job Application Tracker" },
      { name: "REST APIs", note: "Designed and consumed across 8+ services" },
    ],
  },
  {
    name: "Databases",
    items: [
      { name: "MongoDB", note: "Schema design & aggregation pipelines" },
      { name: "Mongoose", note: "ODM modeling for MERN applications" },
    ],
  },
  {
    name: "Tools / Concepts",
    items: [
      { name: "Git / GitHub", note: "Version control across all repositories" },
      { name: "MVC", note: "Architectural pattern applied in full-stack apps" },
      { name: "OOP", note: "Core Software Engineering coursework & practice" },
    ],
  },
];

export default function SkillsMatrix() {
  return (
    <section id="skills" className="bg-white py-28 transition-colors duration-300 dark:bg-[#0a0a0a] sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="mb-14">
          <span className="inline-block rounded-full border border-black/10 bg-black/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-black/60 dark:border-white/15 dark:bg-white/5 dark:text-white/60">
            Technical Expertise
          </span>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-black transition-colors duration-300 dark:text-white sm:text-5xl">
            Skills Matrix
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {CATEGORIES.map((cat, i) => (
            <CategoryBox key={cat.name} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */

function CategoryBox({ category, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
      className="rounded-2xl border border-black/10 bg-black/[0.02] p-7 transition-colors duration-300 dark:border-white/10 dark:bg-white/[0.03]"
    >
      <h3 className="mb-5 text-sm font-black uppercase tracking-[0.2em] text-black/50 dark:text-white/50">
        {category.name}
      </h3>
      <div className="flex flex-wrap gap-3">
        {category.items.map((item, i) => (
          <SkillPill
            key={item.name}
            item={item}
            delay={index * 0.08 + i * 0.05}
          />
        ))}
      </div>
    </motion.div>
  );
}

function SkillPill({ item, delay }) {
  const [hovered, setHovered] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const baseBg = isDark ? "#1a1a1a" : "#ffffff";
  const baseText = isDark ? "#ffffff" : "#000000";
  const baseBorder = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.35, ease: "easeOut", delay }}
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 6, scale: 0.95 }}
        animate={
          hovered
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 6, scale: 0.95 }
        }
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="pointer-events-none absolute -top-3 left-1/2 z-20 w-52 -translate-x-1/2 -translate-y-full rounded-xl bg-black px-3.5 py-2.5 text-center text-xs leading-snug text-white shadow-xl"
      >
        {item.note}
        <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-black" />
      </motion.div>

      {/* Pill */}
      <motion.span
        animate={{
          scale: hovered ? 1.08 : 1,
          backgroundColor: hovered ? "#ff2a2a" : baseBg,
          color: hovered ? "#ffffff" : baseText,
          borderColor: hovered ? "#ff2a2a" : baseBorder,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="inline-block cursor-default select-none rounded-full border px-4 py-2 text-sm font-semibold shadow-sm"
      >
        {item.name}
      </motion.span>
    </motion.div>
  );
}
