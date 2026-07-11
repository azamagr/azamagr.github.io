import React from "react";
import { motion } from "framer-motion";

/**
 * About
 * ---------------------------------------------------------------------------
 * Bold "About Me" section on a vibrant red (#ff2a2a) field.
 *
 *  - Left: a developer ID badge that hangs from a black lanyard. The strap
 *    is a simple tapered black shape with a metal clip circle at the top;
 *    the card itself is tilted -3deg with a deep drop shadow, and gets a
 *    slow, subtle pendulum sway via Framer Motion for a "hanging" feel.
 *  - Right: big black "Hello!" headline, intro copy, and three floating
 *    tech "logos" (simplified inline SVGs for React / Node.js / MongoDB —
 *    stylized marks, not traced brand assets) that bob up and down on
 *    staggered loops.
 *  - Scattered black star decorations with a soft pulse animation.
 *  - A torn-paper white SVG edge along the bottom, transitioning into
 *    whatever (light) section comes next.
 *
 * Usage:
 *   <About photoSrc="/media/azam-headshot.jpg" />
 */

export default function About({ photoSrc = "/IMG/video.png" }) {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-neutral-100 pb-32 pt-28 transition-colors duration-300 dark:bg-[#0a0a0a] sm:pt-32"
    >
      {/* Scattered pulsing star decorations */}
      <PulseStar className="left-[6%] top-[12%] h-6 w-6" delay={0} />
      <PulseStar className="right-[10%] top-[20%] h-4 w-4" delay={0.6} />
      <PulseStar className="left-[14%] bottom-[26%] h-5 w-5" delay={1.1} />
      <PulseStar className="right-[16%] bottom-[16%] h-7 w-7" delay={0.3} />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-20 px-6 sm:px-10 md:grid-cols-2 md:items-center">
        {/* Left: hanging ID badge */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex justify-center md:justify-start"
        >
          <div className="relative flex flex-col items-center pt-2">
            {/* Metal clip */}
            <div className="z-10 h-5 w-8 rounded-full border-2 border-neutral-700 bg-neutral-300 shadow-inner" />

            {/* Lanyard strap */}
            <div
              className="-mt-1 h-28 w-3 rounded-b-sm bg-gradient-to-b from-neutral-900 to-black sm:h-36"
              style={{ clipPath: "polygon(20% 0, 80% 0, 100% 100%, 0% 100%)" }}
            />

            {/* Swaying badge card */}
            <motion.div
              animate={{ rotate: [-3, -1, -3] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ transformOrigin: "top center" }}
              className="relative -mt-1 w-64 rounded-2xl bg-white p-4 shadow-[0_25px_60px_rgba(0,0,0,0.55)] sm:w-72"
            >
              {/* Card hole under the clip */}
              <div className="mx-auto mb-3 h-2.5 w-14 rounded-full bg-neutral-200" />

              <div className="overflow-hidden rounded-xl bg-neutral-100">
                <img
                  src={photoSrc}
                  alt="Muhammad Azam"
                  className="h-64 w-full object-cover sm:h-72"
                />
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm font-black tracking-tight text-black">
                  MUHAMMAD AZAM
                </p>
                <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#ff2a2a]">
                  Full Stack Developer
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right: copy + tech logos */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        >
          <h2 className="text-6xl font-black leading-none tracking-tight text-black transition-colors duration-300 dark:text-white sm:text-7xl">
            Hello!
          </h2>

          <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-black/90 transition-colors duration-300 dark:text-white/90">
            I am <span className="font-bold">MUHAMMAD AZAM</span>, a BS
            Software Engineering graduate from Virtual University of
            Pakistan.
          </p>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-black/80 transition-colors duration-300 dark:text-white/70">
            Specialized in designing REST APIs, integrating databases, and
            developing responsive user interfaces.
          </p>

          {/* Floating tech logos */}
          <div className="mt-12 flex items-center gap-10">
            <FloatingLogo delay={0}>
              <ReactLogo />
            </FloatingLogo>
            <FloatingLogo delay={0.4}>
              <NodeLogo />
            </FloatingLogo>
            <FloatingLogo delay={0.8}>
              <MongoLogo />
            </FloatingLogo>
          </div>
        </motion.div>
      </div>

      {/* Torn-paper transition into the next (light) section */}
      <TornPaperDivider />
    </section>
  );
}

/* ---------------------------------------------------------------------- */
/* Helpers                                                                 */
/* ---------------------------------------------------------------------- */

function FloatingLogo({ children, delay = 0 }) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className="drop-shadow-[0_10px_15px_rgba(0,0,0,0.25)]"
    >
      {children}
    </motion.div>
  );
}

function PulseStar({ className = "", delay = 0 }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`pointer-events-none absolute z-0 text-black dark:text-white ${className}`}
      animate={{ opacity: [0.25, 0.7, 0.25], scale: [1, 1.15, 1] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <path d="M12 0l2.9 8.1L23 11l-8.1 2.9L12 22l-2.9-8.1L1 11l8.1-2.9L12 0z" />
    </motion.svg>
  );
}

function TornPaperDivider() {
  // A jagged white edge spanning the full width, sitting at the bottom
  // of the red section so the next (light) section appears "torn" into.
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 leading-[0]">
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="h-24 w-full sm:h-32"
      >
        <path
          fill="#ffffff"
          d="M0,40 L48,52 L96,32 L144,58 L192,36 L240,60 L288,30 L336,54
             L384,38 L432,62 L480,34 L528,56 L576,40 L624,64 L672,32
             L720,58 L768,36 L816,60 L864,30 L912,54 L960,38 L1008,62
             L1056,34 L1104,56 L1152,40 L1200,64 L1248,32 L1296,58
             L1344,36 L1392,60 L1440,40 L1440,100 L0,100 Z"
        />
      </svg>
    </div>
  );
}

/* Simplified, stylized tech marks (not traced logos) */

function ReactLogo() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="28" r="4.5" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="2.2" fill="none">
        <ellipse cx="28" cy="28" rx="22" ry="9" />
        <ellipse cx="28" cy="28" rx="22" ry="9" transform="rotate(60 28 28)" />
        <ellipse cx="28" cy="28" rx="22" ry="9" transform="rotate(120 28 28)" />
      </g>
    </svg>
  );
}

function NodeLogo() {
  return (
    <svg width="52" height="56" viewBox="0 0 52 56" fill="none">
      <path
        d="M26 1 L50 14 V42 L26 55 L2 42 V14 Z"
        fill="#3C873A"
      />
      <path
        d="M26 1 L50 14 V42 L26 55 V1Z"
        fill="#000000"
        fillOpacity="0.15"
      />
    </svg>
  );
}

function MongoLogo() {
  return (
    <svg width="40" height="56" viewBox="0 0 40 56" fill="none">
      <path
        d="M20 2C20 2 34 16 34 32C34 44 27 51 20 55C13 51 6 44 6 32C6 16 20 2 20 2Z"
        fill="#10AA50"
      />
      <line x1="20" y1="40" x2="20" y2="55" stroke="#0d8f43" strokeWidth="2" />
    </svg>
  );
}
