import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * CustomCursor
 * ---------------------------------------------------------------------------
 * Replaces the default mouse pointer with a small red dot + a larger
 * trailing ring that follows it with a soft spring lag — a common
 * "premium site" touch (Awwwards-style).
 *
 *  - The dot tracks the raw cursor position (instant).
 *  - The ring trails behind with spring physics (smooth catch-up feel).
 *  - Hovering any link, button, or anything with data-cursor="hover"
 *    grows the ring and fills it, so interactive elements feel tactile.
 *  - Automatically disables itself on touch devices (no mouse), so it
 *    never gets in the way on mobile.
 *
 * Usage — mount ONCE near the root of your app:
 *   <CustomCursor />
 * (Put it in App.jsx, alongside <Preloader>/<Navbar>, not inside any
 * particular section — it's fixed and covers the whole viewport.)
 *
 * To make any element trigger the "hover" grow effect, just add:
 *   <a data-cursor="hover">...</a>
 * The component auto-attaches this behavior to all <a> and <button>
 * elements on mount, so most sites need zero extra markup.
 */

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  // Raw position (dot) and spring-smoothed position (ring)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ringX = useSpring(x, { stiffness: 250, damping: 22, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 250, damping: 22, mass: 0.5 });

  useEffect(() => {
    // Skip entirely on touch-only devices
    const touchDevice =
      window.matchMedia?.("(pointer: coarse)").matches ?? false;
    setIsTouch(touchDevice);
    if (touchDevice) return;

    const handleMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (hidden) setHidden(false);
    };
    const handleLeave = () => setHidden(true);

    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);

    // Auto-attach hover behavior to common interactive elements
    const interactiveEls = document.querySelectorAll(
      "a, button, [data-cursor='hover']"
    );
    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isTouch) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[999999] hidden transition-opacity duration-300 sm:block ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Small solid dot — tracks instantly */}
      <motion.div
        style={{ translateX: x, translateY: y }}
        className="absolute left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff2a2a]"
      />

      {/* Larger trailing ring — smoothed with a spring, grows + fills on hover */}
      <motion.div
        style={{ translateX: ringX, translateY: ringY }}
        animate={{
          scale: hovering ? 1.6 : 1,
          backgroundColor: hovering ? "rgba(255,42,42,0.15)" : "rgba(255,42,42,0)",
          borderColor: "#ff2a2a",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="absolute left-0 top-0 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border"
      />
    </div>
  );
}
