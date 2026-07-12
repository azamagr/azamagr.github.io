import React from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

/**
 * Education
 * ---------------------------------------------------------------------------
 * Vertical timeline of academic history, matching the site's card language.
 * The most recent/current degree also lists the major coursework as pills.
 *
 * Usage:
 *   <Education />
 */

const EDUCATION = [
  {
    degree: "BS Software Engineering",
    institute: "Virtual University of Pakistan",
    duration: "2021 – Present",
    courses: [
      "Data Structures",
      "OOP",
      "DBMS",
      "Software Engineering",
      "Operating Systems",
      "Computer Networks",
      "Software Architecture & Design",
      "Web Engineering",
      "HCI",
      "Software Quality Engineering",
    ],
  },
  {
    degree: "FSc. Pre-Engineering",
    institute: "Govt. Islamia Degree College, Kasur (BISE Lahore)",
    duration: "2019 – 2021",
  },
  {
    degree: "Matriculation",
    institute: "Govt. Islamia High School, Kasur (BISE Lahore)",
    duration: "2017 – 2019",
  },
];

export default function Education() {
  return (
    <section
      id="education"
      className="bg-white py-28 transition-colors duration-300 dark:bg-[#0a0a0a] sm:py-32"
    >
      <div className="mx-auto max-w-4xl px-6 sm:px-10">
        <div className="mb-14">
          <span className="inline-block rounded-full border border-black/10 bg-black/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-black/60 dark:border-white/15 dark:bg-white/5 dark:text-white/60">
            Academic Background
          </span>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-black transition-colors duration-300 dark:text-white sm:text-5xl">
            Education
          </h2>
        </div>

        <div className="relative flex flex-col gap-10">
          {/* Vertical line */}
          <div className="absolute bottom-0 left-5 top-1 w-px bg-black/10 dark:bg-white/10" />

          {EDUCATION.map((edu, i) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.1 }}
              className="relative flex gap-6 pl-2"
            >
              {/* Node */}
              <span className="relative z-10 mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#ff2a2a] bg-white text-[#ff2a2a] dark:bg-[#0a0a0a]">
                <GraduationCap className="h-4 w-4" />
              </span>

              <div className="flex-1 rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-black tracking-tight text-black dark:text-white">
                    {edu.degree}
                  </h3>
                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#ff2a2a]">
                    {edu.duration}
                  </span>
                </div>
                <p className="mt-1 text-sm text-black/60 dark:text-white/60">
                  {edu.institute}
                </p>

                {edu.courses && (
                  <div className="mt-4 flex flex-wrap gap-2 border-t border-black/10 pt-4 dark:border-white/10">
                    {edu.courses.map((c) => (
                      <span
                        key={c}
                        className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs font-medium text-black/70 dark:border-white/10 dark:bg-white/5 dark:text-white/70"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
