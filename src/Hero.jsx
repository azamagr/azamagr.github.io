import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

/**
 * Hero
 * ---------------------------------------------------------------------------
 * Fullscreen (100vh) cinematic hero for a MERN-stack developer portfolio.
 * (Image-based version — no video.)
 *
 *  - Background is your photo (dimmed), covered with a dark cinematic
 *    gradient so the white text stays readable.
 *  - Left: two-line heading — "Hi, I'm a" solid white, then "MERN Stack
 *    Developer" rendered with a transparent fill + white outline stroke.
 *  - Two CTAs: solid white pill ("View My Work") and a glass pill
 *    ("Contact Me").
 *  - Right: the SAME photo again, shown sharp inside a glass-framed circle.
 *  - Bottom-center bouncing scroll arrow, desktop-only.
 *
 * Usage:
 *   <Hero photoSrc="/images/profile.jpg" />
 * (Put your one photo at public/images/profile.jpg — it's reused for both
 * the background and the circular frame.)
 */

export default function Hero({ photoSrc = "/IMG/pass.png" }) {
  return (
    <section
      id="home"
      className="relative flex h-screen w-full items-center overflow-hidden bg-black"
    >
      {/* Background photo (same photo, dimmed + blurred) */}
      <img
        src={photoSrc}
        alt=""
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-sm"
      />
      {/* Cinematic gradient overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-16 px-6 sm:px-10 md:flex-row md:items-center">
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <h1 className="font-black leading-[0.95] tracking-tight text-white">
            <span className="block text-3xl sm:text-4xl md:text-5xl">
              Hi, I'm a
            </span>
            <span
              className="mt-1 block text-5xl sm:text-6xl md:text-7xl"
              style={{
                WebkitTextStroke: "1.5px #ffffff",
                color: "transparent",
              }}
            >
              MERN Stack Developer
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Software Engineering graduate specializing in building full-stack
            web applications using React.js, Node.js, Express.js, and
            MongoDB, with a focus on performance and scalability.
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

        {/* Right: profile photo, glass-framed circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="flex flex-col items-center gap-4 self-center md:self-auto"
        >
          <div className="relative flex h-56 w-56 items-center justify-center rounded-full border border-white/30 bg-white/10 p-2 backdrop-blur-md sm:h-64 sm:w-64">
            <img
              src={photoSrc}
              alt="Muhammad Azam"
              className="h-full w-full rounded-full object-cover"
            />
            <span className="pointer-events-none absolute inset-0 rounded-full shadow-[0_0_45px_rgba(255,42,42,0.35)]" />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator — desktop only */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[10px] font-medium tracking-[0.3em] text-white/50">
          SCROLL
        </span>
        <ArrowDown className="h-5 w-5 text-white/60" strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}
