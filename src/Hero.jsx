import React from "react";
import { motion } from "framer-motion";

/**
 * Hero
 * ---------------------------------------------------------------------------
 * Full-bleed split hero — no video, no generic "dim photo + circle" look.
 *
 *  - Left (black): monospace "code-comment" eyebrow, bold headline with a
 *    blinking terminal-cursor accent, subheading, two CTAs.
 *  - Right: your photo runs full-height, treated as a red/black duotone
 *    (grayscale + red color-multiply overlay) rather than a small dimmed
 *    circle — a bolder, more editorial signature look tied to the brand red.
 *  - A thin vertical rule + small running "status" tag sit at the seam
 *    between the two halves, like a terminal status line.
 *
 * Usage:
 *   <Hero photoSrc="/images/profile.jpg" />
 * (Drop your one photo at public/images/profile.jpg.)
 */

export default function Hero({ photoSrc = "/images/profile.jpg" }) {
  return (
    <section
      id="home"
      className="relative flex h-screen w-full overflow-hidden bg-black"
    >
      <div className="relative z-20 grid h-full w-full grid-cols-1 md:grid-cols-[1.15fr_1fr]">
        {/* Left: copy */}
        <div className="flex flex-col justify-center px-6 py-24 sm:px-10 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-xl"
          >
            <p
              className="mb-6 text-xs font-medium tracking-wide text-[#ff2a2a]"
              style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
            >
              {"// available for hire"}
            </p>

            <h1 className="font-black leading-[0.95] tracking-tight text-white">
              <span className="block text-3xl sm:text-4xl md:text-5xl">
                Hi, I'm a
              </span>
              <span className="mt-1 block text-5xl sm:text-6xl md:text-7xl">
                MERN Stack
                <br />
                Developer
                <motion.span
                  aria-hidden="true"
                  className="ml-2 inline-block h-[0.8em] w-[0.5rem] translate-y-1 bg-[#ff2a2a] align-middle"
                  animate={{ opacity: [1, 1, 0, 0] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                    times: [0, 0.5, 0.5, 1],
                  }}
                />
              </span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-white/60 sm:text-lg">
              Software Engineering graduate specializing in building
              full-stack web applications using React.js, Node.js,
              Express.js, and MongoDB, with a focus on performance and
              scalability.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-transform duration-300 hover:scale-105"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="rounded-full border border-white/40 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/70 hover:bg-white/10"
              >
                Contact Me
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right: duotone photo panel */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative hidden overflow-hidden border-l border-white/10 md:block"
        >
          <img
            src={photoSrc}
            alt="Muhammad Azam"
            className="h-full w-full object-cover grayscale"
          />
          {/* Red duotone wash */}
          <div
            className="absolute inset-0 mix-blend-multiply"
            style={{ backgroundColor: "#ff2a2a" }}
          />
          {/* Extra black falloff toward the seam for legibility + depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Terminal-style status tag, bottom-right of the photo panel */}
          <div
            className="absolute bottom-6 right-6 rounded-md border border-white/15 bg-black/40 px-3 py-1.5 text-[11px] text-white/70 backdrop-blur-sm"
            style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
          >
            status: building
          </div>
        </motion.div>
      </div>

      {/* Mobile fallback: photo as a subtle full-bleed backdrop behind the copy */}
      <img
        src={photoSrc}
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25 grayscale md:hidden"
      />
      <div
        className="absolute inset-0 -z-10 mix-blend-multiply md:hidden"
        style={{ backgroundColor: "#ff2a2a" }}
      />
      <div className="absolute inset-0 -z-10 bg-black/60 md:hidden" />
    </section>
  );
}