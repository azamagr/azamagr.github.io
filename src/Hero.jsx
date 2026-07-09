import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import heroImage from "../IMG/video.png"; // Path apne folder ke hisab se adjust karein

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex h-screen w-full items-center overflow-hidden bg-black"
    >
      {/* Background Image */}
      <img
        src={heroImage}
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-16 px-6 sm:px-10 md:flex-row md:items-center">

        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
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
              className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:scale-105"
            >
              View My Work
            </a>

            <a
              href="#contact"
              className="rounded-full border border-white/40 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/10"
            >
              Contact Me
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:flex flex-col items-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <span className="text-[10px] tracking-[0.3em] text-white/50">
          SCROLL
        </span>

        <ArrowDown className="h-5 w-5 text-white/60" />
      </motion.div>
    </section>
  );
}