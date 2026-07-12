import React from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

/**
 * Certifications
 * ---------------------------------------------------------------------------
 * Grid of certifications/courses, styled consistently with the Projects
 * section (same card language: white bg section, bordered cards, hover
 * lift, tag-style meta).
 *
 * Usage:
 *   <Certifications />
 * Replace each `link` with the real certificate URL when you have it —
 * placeholders are "#" for now.
 */

const CERTIFICATIONS = [
  {
    title: "Back End Development and APIs",
    issuer: "freeCodeCamp",
    date: "October 17, 2025",
    link: "/certificates/APIs Certificate.png",
  },
  {
    title: "Full Stack Web Development",
    issuer: "IDEO College of Technology",
    date: "May 8, 2024",
    link: "/certificates/Web_Development.JPG",
  },
  {
    title: "Python Essential Training",
    issuer: "LinkedIn Learning",
    date: "August 28, 2024",
    link: "/certificates/Python_Essential_Training_Certificate.png",
  },
  {
    title: "Python Object-Oriented Programming",
    issuer: "LinkedIn Learning",
    date: "August 27, 2024",
    link: "/certificates/Python_Object-Oriented_Programming_Certificate.png",
  },
  {
    title: "Learning the Python 3 Standard Library",
    issuer: "LinkedIn Learning",
    date: "August 30, 2024",
    link: "/certificates/Python_3_Standard_Library_Certificate.png",
  },
  {
    title: "CCNAv7: Introduction to Networks",
    issuer: "Cisco Networking Academy",
    date: "June 2024",
    link: "/certificates/Introduction_to_Networks_Certificate.png",
  },
  {
    title: "WordPress",
    issuer: "Digiskill.pk",
    date: "Nov 2023 – Feb 2024",
    link: "/certificates/WordPress_Certififcate.png",
  },
  {
    title: "Digital Literacy",
    issuer: "Digiskill.pk",
    date: "Oct 2020 – Jan 2021",
    link: "/certificates/Digital-Literacy_Certificate.png",
  },
];

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="bg-white py-28 transition-colors duration-300 dark:bg-[#0a0a0a] sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="mb-14">
          <span className="inline-block rounded-full border border-black/10 bg-black/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-black/60 dark:border-white/15 dark:bg-white/5 dark:text-white/60">
            Credentials
          </span>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-black transition-colors duration-300 dark:text-white sm:text-5xl">
            Certifications
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.06 }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="group flex flex-col rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-[0_20px_45px_rgba(0,0,0,0.1)] dark:border-white/10 dark:bg-white/[0.03]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ff2a2a]/10 text-[#ff2a2a]">
                <Award className="h-5 w-5" />
              </span>

              <h3 className="mt-4 text-lg font-black leading-snug tracking-tight text-black dark:text-white">
                {cert.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-black/60 dark:text-white/60">
                {cert.issuer}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.15em] text-black/40 dark:text-white/40">
                {cert.date}
              </p>

              <a
                href={cert.link}
                target="_blank"
                rel="noreferrer"
                className="mt-5 flex items-center gap-1.5 border-t border-black/10 pt-4 text-sm font-semibold text-black/70 transition-colors duration-300 hover:text-[#ff2a2a] dark:border-white/10 dark:text-white/70"
              >
                <ExternalLink className="h-4 w-4" />
                View Certificate
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
