import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Bot } from "lucide-react";

/**
 * CustomCursor
 * ---------------------------------------------------------------------------
 * An "AI/bot" themed cursor:
 *
 *  - A pulsing glowing red core (like a HUD reticle / active sensor).
 *  - A dashed ring around it that continuously rotates slowly — a subtle
 *    "scanning" motion, giving it a tech/AI feel even at rest.
 *  - On hovering any link/button, the ring spins up fast, expands, and
 *    a small robot icon fades in at the center — like the cursor
 *    "engages" when it detects something interactive.
 *  - Uses `mix-blend-mode: difference` on the ring so it stays visible
 *    against any background (red hero, white sections, black footer)
 *    without any manual color logic.
 *
 * Usage — mount ONCE near the root of your app:
 *   <CustomCursor />
 *
 * Note: only renders at sm breakpoint (640px) and above, and is skipped
 * on touch devices. Move the mouse after load — it only appears once
 * the cursor actually moves.
 */

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 300, damping: 28, mass: 0.5 });

  useEffect(() => {
    const touchDevice =
      window.matchMedia?.("(pointer: coarse)").matches ?? false;
    setIsTouch(touchDevice);
    if (touchDevice) return;

    const handleMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);

    const attachHoverListeners = () => {
      const els = document.querySelectorAll(
        "a, button, [data-cursor='hover']"
      );
      const onEnter = () => setHovering(true);
      const onLeave = () => setHovering(false);
      els.forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
      return () =>
        els.forEach((el) => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
        });
    };

    let cleanupHover = attachHoverListeners();
    const rescan = setInterval(() => {
      cleanupHover();
      cleanupHover = attachHoverListeners();
    }, 1500);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      cleanupHover();
      clearInterval(rescan);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isTouch) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[999999] hidden transition-opacity duration-300 sm:block ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Glowing pulsing core — the "sensor" */}
      <motion.div
        style={{ translateX: x, translateY: y }}
        animate={{
          scale: hovering ? [1, 0.7, 1] : [1, 1.3, 1],
          boxShadow: hovering
            ? "0 0 0px rgba(255,42,42,0)"
            : [
                "0 0 6px rgba(255,42,42,0.9)",
                "0 0 14px rgba(255,42,42,0.6)",
                "0 0 6px rgba(255,42,42,0.9)",
              ],
        }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff2a2a]"
      />

      {/* Dashed scanning ring — rotates slowly at rest, spins up + expands
          on hover, using mix-blend-mode so it's visible on any background */}
      <motion.svg
        style={{
          translateX: ringX,
          translateY: ringY,
          mixBlendMode: "difference",
        }}
        animate={{
          rotate: 360,
          width: hovering ? 56 : 30,
          height: hovering ? 56 : 30,
        }}
        transition={{
          rotate: {
            duration: hovering ? 1.2 : 6,
            repeat: Infinity,
            ease: "linear",
          },
          width: { duration: 0.3, ease: "easeOut" },
          height: { duration: 0.3, ease: "easeOut" },
        }}
        viewBox="0 0 40 40"
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
      >
        <circle
          cx="20"
          cy="20"
          r="17"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeDasharray="6 5"
        />
        {/* Small tick marks, like a targeting reticle */}
        <circle cx="20" cy="3" r="1.4" fill="white" />
        <circle cx="20" cy="37" r="1.4" fill="white" />
        <circle cx="3" cy="20" r="1.4" fill="white" />
        <circle cx="37" cy="20" r="1.4" fill="white" />
      </motion.svg>

      {/* Bot icon — fades in at the center when "engaged" (hovering) */}
      <motion.div
        style={{ translateX: ringX, translateY: ringY }}
        animate={{ opacity: hovering ? 1 : 0, scale: hovering ? 1 : 0.4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 text-[#ff2a2a]"
      >
        <Bot className="h-5 w-5" strokeWidth={2} />
      </motion.div>
    </div>
  );
}