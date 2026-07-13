import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

/**
 * Projects
 * ---------------------------------------------------------------------------
 * Filterable "Projects Grid" — All / Full-Stack / Microservices / Frontend.
 *
 *  - Tabs filter the PROJECTS array by category; grid re-flows with a
 *    Framer Motion `layout` + AnimatePresence exit/enter so cards animate
 *    smoothly between filter states instead of just popping.
 *  - Each card: title, year, description, tech-tag pills, and two links
 *    ("GitHub Code" / "Live Demo"). Replace the placeholder "#" hrefs with
 *    your real repo/demo URLs.
 *  - The "Responsive UI Frontend UI Suite" is modeled as one Frontend-
 *    category project that renders its own sub-grid of client/clone pieces
 *    (Watch X, J. Clothing, BAROQUE, Chat Box, Education Website, GCU Home
 *    Page) instead of six separate top-level cards, matching the brief.
 *
 * Usage:
 *   <Projects />
 */

const TABS = ["All", "Full-Stack", "Microservices", "Frontend"];

const PROJECTS = [
  {
    id: "job-tracker",
    title: "Job Application Tracker",
    meta: "Final Year Project · 2026",
    category: "Full-Stack",
    desc: "Full-stack MERN app with JWT/bcrypt authentication, role-based access, and a data-visualization analytics dashboard.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
    github: "https://github.com/azamagr/Job_Application_Tracker",
    demo: "https://azamagr.github.io/Job_Application_Tracker/",
  },
  {
    id: "job-form",
    title: "Job Application Form",
    meta: "MERN Stack · 2026",
    category: "Full-Stack",
    desc: "Responsive single-page app with client-side validation, backend data sanitization, and MongoDB persistence.",
    tags: ["React.js", "Express.js", "MongoDB", "Validation"],
    github: "https://github.com/azamagr/Job_AppForm",
    demo: "https://azamagr.github.io/Job_AppForm/public/index.html",
  },
  {
    id: "exercise-tracker",
    title: "Exercise Tracker",
    meta: "MERN Stack · 2025",
    category: "Full-Stack",
    desc: "Full-stack workout logging app with profile management, exercise history, and REST API endpoints.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com/azamagr/Exercise_Tracker",
    demo: "https://azamagr.github.io/Exercise_Tracker/",
  },
  {
    id: "file-metadata",
    title: "File Metadata Microservice",
    meta: "Node.js / Express · 2025",
    category: "Microservices",
    desc: "Extracts and returns file metadata (name, type, size) using Multer middleware.",
    tags: ["Node.js", "Express.js", "Multer"],
    github: "https://github.com/azamagr/File_Metadata_Microservice",
    demo: "https://azamagr.github.io/File_Metadata_Microservice/",
  },
  {
    id: "url-shortener",
    title: "URL Shortener Microservice",
    meta: "2025",
    category: "Microservices",
    desc: "Converts long URLs into short links with redirection and URL validation.",
    tags: ["Node.js", "Express.js", "MongoDB"],
    github: "https://github.com/azamagr/URL_Shortener_Microservice",
    demo: "https://azamagr.github.io/URL_Shortener_Microservice/",
  },
  {
    id: "header-parser",
    title: "Request Header Parser Microservice",
    meta: "2025",
    category: "Microservices",
    desc: "Backend API parsing HTTP request headers to return client IP, language, and user-agent as JSON.",
    tags: ["Node.js", "Express.js", "REST API"],
    github: "https://github.com/azamagr/Request_Header_Parser_Microservice",
    demo: "https://azamagr.github.io/Request_Header_Parser_Microservice/",
  },
  {
    id: "timestamp",
    title: "Timestamp Microservice",
    meta: "2025",
    category: "Microservices",
    desc: "REST API for converting Unix timestamps and human-readable dates with UTC handling.",
    tags: ["Node.js", "Express.js"],
    github: "https://github.com/azamagr/Timestamp_Microservice",
    demo: "https://azamagr.github.io/Timestamp_Microservice/",
  },
  {
  id: "ui-suite",
  title: "Responsive UI Frontend UI Suite",
  meta: "2023 – 2024",
  category: "Frontend",
  desc: "Client and clone frontend builds focused on responsive layout systems.",
  tags: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "jQuery"],
  github: "https://github.com/azamagr",
  subGrid: [
      {
        name: "Watch X",
        demo: "https://azamagr.github.io/WatchX/",
      },
      {
        name: "J. Clothing",
        demo: "https://azamagr.github.io/J_dot/",
      },
      {
        name: "BAROQUE",
        demo: "https://azamagr.github.io/me_BAROUQE/",
      },
      {
        name: "Chat Box",
        demo: "https://azamagr.github.io/Chat_Box/",
      },
      {
        name: "Education Website",
        demo: "https://azamagr.github.io/EDU_Website/",
      },
      {
        name: "GCU Home Page",
        demo: "https://azamagr.github.io/GCU_Form/",
      },
    ],
  },
];

export default function Projects() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === active);

  return (
    <section id="projects" className="bg-white py-28 transition-colors duration-300 dark:bg-[#0a0a0a] sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-block rounded-full border border-black/10 bg-black/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-black/60 dark:border-white/15 dark:bg-white/5 dark:text-white/60">
              Selected Work
            </span>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-black transition-colors duration-300 dark:text-white sm:text-5xl">
              Projects
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-300 ${
                  active === tab
                    ? "text-white"
                    : "text-black/60 hover:text-black dark:text-white/50 dark:hover:text-white"
                }`}
              >
                {active === tab && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-full bg-[#ff2a2a]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */

function ProjectCard({ project }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.015 }}
      className={`group relative flex flex-col rounded-2xl border border-black/10 bg-white p-7 shadow-sm transition-colors transition-shadow duration-300 hover:shadow-[0_20px_45px_rgba(0,0,0,0.1)] dark:border-white/10 dark:bg-[#141414] dark:hover:shadow-[0_20px_45px_rgba(0,0,0,0.5)] ${
        project.subGrid ? "md:col-span-2" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-black tracking-tight text-black dark:text-white">
            {project.title}
          </h3>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-black/40 dark:text-white/40">
            {project.meta}
          </p>
        </div>
        <span className="rounded-full bg-black/5 px-3 py-1 text-[11px] font-semibold text-black/50 dark:bg-white/10 dark:text-white/50">
          {project.category}
        </span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-black/65 dark:text-white/60">
        {project.desc}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs font-medium text-black/70 dark:border-white/10 dark:bg-white/5 dark:text-white/70"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Sub-grid for the Frontend UI Suite */}
      {project.subGrid && (
        <div className="mt-6 grid grid-cols-2 gap-3 border-t border-black/10 pt-6 dark:border-white/10 sm:grid-cols-3">
          {project.subGrid.map((item) => (
            <div
              key={item}
              className="rounded-lg border border-black/10 bg-black/[0.02] px-3 py-3 text-center text-xs font-semibold text-black/70 transition-colors duration-300 hover:border-[#ff2a2a]/40 hover:bg-[#ff2a2a]/5 hover:text-[#ff2a2a] dark:border-white/10 dark:bg-white/5 dark:text-white/70"
            >
              {item}
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex items-center gap-5 border-t border-black/10 pt-5 dark:border-white/10">
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-sm font-semibold text-black/70 transition-colors duration-300 hover:text-[#ff2a2a] dark:text-white/70"
        >
          <Github className="h-4 w-4" />
          GitHub Code
        </a>
        <a
          href={project.demo}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-sm font-semibold text-black/70 transition-colors duration-300 hover:text-[#ff2a2a] dark:text-white/70"
        >
          <ExternalLink className="h-4 w-4" />
          Live Demo
        </a>
      </div>
    </motion.div>
  );
}
