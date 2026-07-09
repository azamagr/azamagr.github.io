import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, ArrowDown } from "lucide-react";

/**
 * Hero
 * ---------------------------------------------------------------------------
 * Fullscreen (100vh) cinematic hero for a MERN-stack developer portfolio.
 *
 *  - Dark background video layer (muted, looping) sits behind everything as
 *    ambient atmosphere; a dedicated Play Reel button starts the actual
 *    60s creator reel with sound/full playback and swaps the icon + label.
 *  - Left: two-line heading — "Hi, I'm a" solid white, then "MERN Stack
 *    Developer" rendered with a transparent fill + white outline stroke
 *    (via WebkitTextStroke, since Tailwind has no text-stroke utility).
 *  - Two CTAs: solid white pill ("View My Work") and a glass pill
 *    ("Contact Me").
 *  - Right: large circular glass Play Reel button, red glow, toggling
 *    Play/Pause + label.
 *  - Bottom-center bouncing scroll arrow, desktop-only.
 *
 * Usage:
 *   <Hero videoSrc="/media/reel.mp4" bgVideoSrc="/media/bg-loop.mp4" />
 */

export default function Hero({
  videoSrc = "/media/reel.mp4",
  bgVideoSrc = "/media/bg-loop.mp4",
}) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (playing) {
      vid.pause();
      setPlaying(false);
    } else {
      vid.play();
      setPlaying(true);
    }
  };

  return (
    <section
      id="home"
      className="relative flex h-screen w-full items-center overflow-hidden bg-black"
    >
      {/* Ambient looping background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-30"
        src={bgVideoSrc}
        autoPlay
        muted
        loop
        playsInline
      />
      {/* Cinematic gradient overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />

      {/* Reel video, hidden until played, overlays the section */}
      <video
        ref={videoRef}
        src={videoSrc}
        className={`absolute inset-0 z-10 h-full w-full object-cover transition-opacity duration-500 ${
          playing ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onEnded={() => setPlaying(false)}
        playsInline
      />

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

        {/* Right: play reel button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="flex flex-col items-center gap-4 self-center md:self-auto"
        >
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause reel" : "Play reel"}
            className="group relative flex h-28 w-28 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md transition-all duration-300 hover:border-[#ff2a2a]/70 hover:shadow-[0_0_45px_rgba(255,42,42,0.6)] sm:h-32 sm:w-32"
          >
            <span className="absolute inset-0 rounded-full bg-[#ff2a2a]/0 transition-colors duration-300 group-hover:bg-[#ff2a2a]/10" />
            {playing ? (
              <Pause className="h-9 w-9 text-white" strokeWidth={1.5} />
            ) : (
              <Play className="ml-1 h-9 w-9 text-white" strokeWidth={1.5} />
            )}
          </button>
          <span className="text-xs font-semibold tracking-[0.25em] text-white/70">
            {playing ? "PAUSE" : "PLAY REEL"}
          </span>
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
