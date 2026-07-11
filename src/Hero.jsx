import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

/**
 * Hero
 * ---------------------------------------------------------------------------
 * Fullscreen (100vh) hero, reference-style: a bold solid-color panel with
 * your cutout photo large on the right side (not circular, not blurred —
 * a real subject cutout like the "Leeshark" reference you shared).
 *
 *  - Background: your "video.png" photo sits behind everything, dimmed
 *    under the brand-red tint + gradient so text stays legible.
 *  - Left: heading + subheading + two CTAs.
 *  - No separate foreground photo here — your other photo ("pass.png")
 *    is used in the About section's ID badge instead.
 *  - Bottom-center bouncing scroll arrow, desktop-only.
 *
 * Usage:
 *   <Hero bgImageSrc="/IMG/video.png" />
 */

export default function Hero({ bgImageSrc = "/IMG/video.png" }) {
  return (
    <section
      id="home"
      className="relative flex h-screen w-full items-center overflow-hidden bg-[#ff2a2a]"
    >
      {/* Background photo, dimmed under the red tint */}
      <img
        src={bgImageSrc}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      {/* Red tint so the background photo still reads as part of the brand panel */}
      <div className="absolute inset-0 bg-[#ff2a2a]/70" />
      {/* Subtle depth vignette so text stays legible over the flat color */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-20 mx-auto flex h-full w-full max-w-7xl items-center justify-center px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl text-center"
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

          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-white/85 sm:text-lg">
            Software Engineering graduate specializing in building full-stack
            web applications using React.js, Node.js, Express.js, and
            MongoDB, with a focus on performance and scalability.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
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

      {/* Scroll indicator — desktop only */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[10px] font-medium tracking-[0.3em] text-white/60">
          SCROLL
        </span>
        <ArrowDown className="h-5 w-5 text-white/70" strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}
