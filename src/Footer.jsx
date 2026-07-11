import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

/**
 * Footer
 * ---------------------------------------------------------------------------
 * Premium, monochrome, Awwwards-style footer on a near-black (#111111)
 * background.
 *
 *  - Top: three columns — Services / Education & Certifications /
 *    Availability + current year.
 *  - Center: a massive lowercase "muhammad azam" wordmark that reveals via
 *    a clip-path wipe and drifts slightly (parallax) as the footer scrolls
 *    into view, bound to scroll progress with useScroll/useTransform.
 *  - Bottom bar: copyright + "Built with React" (left), underlined email
 *    link (center), GitHub/LinkedIn with hover animations (right).
 *
 * Usage:
 *   <Footer />
 */

const SERVICES = [
  "MERN Stack Development",
  "REST API Design",
  "Database Integration",
  "Responsive UI Development",
];

export default function Footer() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  // Wordmark reveal: clip-path wipes left-to-right as the footer enters view
  const clipInset = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const clipPath = useTransform(clipInset, (v) => `inset(0 ${v}% 0 0)`);
  // Subtle parallax drift alongside the reveal
  const x = useTransform(scrollYProgress, [0, 1], [-40, 0]);

  const year = new Date().getFullYear();

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden bg-white pt-20 transition-colors duration-300 dark:bg-[#111111] sm:pt-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Top: three columns */}
        <div className="grid grid-cols-1 gap-12 border-b border-black/10 pb-16 dark:border-white/10 sm:grid-cols-3 sm:gap-8">
          <FooterColumn label="Services">
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s} className="text-sm text-black/60 dark:text-white/60">
                  {s}
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn label="Education & Certifications">
            <ul className="space-y-2.5">
              <li className="text-sm text-black/60 dark:text-white/60">
                BS Software Engineering Graduate
              </li>
              <li className="text-sm text-black/60 dark:text-white/60">
                freeCodeCamp Certified Back-End Developer
              </li>
            </ul>
          </FooterColumn>

          <FooterColumn label="Availability" align="sm:text-right">
            <p className="text-sm text-black/60 dark:text-white/60">
              Available for Junior MERN Stack / Full-Stack Developer Roles
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm text-black/40 dark:text-white/40 sm:justify-end">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff2a2a]" />
              {year}
            </p>
          </FooterColumn>
        </div>

        {/* Center: giant scroll-revealed wordmark */}
        <div className="overflow-hidden py-14 sm:py-20">
          <motion.h2
            style={{ clipPath, x }}
            className="select-none whitespace-nowrap text-center text-[15vw] font-black leading-none tracking-tighter text-black transition-colors duration-300 dark:text-white sm:text-[10vw]"
          >
            muhammad azam
          </motion.h2>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-black/10 dark:border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-6 py-8 text-center sm:flex-row sm:justify-between sm:gap-0 sm:px-10 sm:text-left">
          <p className="text-xs text-black/40 dark:text-white/40">
            © {year} Muhammad Azam. Built with React.
          </p>

          <a
            href="mailto:azamghafoorreal@gmail.com"
            className="text-sm font-medium text-black/80 underline decoration-black/30 underline-offset-4 transition-colors duration-300 hover:text-[#ff2a2a] hover:decoration-[#ff2a2a] dark:text-white/80 dark:decoration-white/30 dark:hover:text-white"
          >
            azamghafoorreal@gmail.com
          </a>

          <div className="flex items-center gap-5">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="group text-black/60 transition-colors duration-300 hover:text-[#ff2a2a] dark:text-white/60 dark:hover:text-white"
            >
              <Github className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="group text-black/60 transition-colors duration-300 hover:text-[#ff2a2a] dark:text-white/60 dark:hover:text-white"
            >
              <Linkedin className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------------------- */

function FooterColumn({ label, children, align = "" }) {
  return (
    <div className={align}>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-black/35 dark:text-white/35">
        {label}
      </p>
      {children}
    </div>
  );
}
