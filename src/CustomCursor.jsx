import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * CustomCursor
 * ---------------------------------------------------------------------------
 * A distinctive "invert" cursor (the Awwwards-style trick): the ring uses
 * `mix-blend-mode: difference`, so it automatically inverts against
 * whatever is behind it — visible and striking on the red Hero, white
 * sections, and the black Footer alike, with zero manual color logic.
 *
 *  - Small solid dot: tracks the raw cursor position instantly.
 *  - Larger blend-mode ring: trails behind with spring physics, and
 *    grows + fills solid on hover over links/buttons.
 *
 * Usage — mount ONCE near the root of your app:
 *   <CustomCursor />
 *
 * Note: the cursor UI only renders at sm breakpoint (640px) and above,
 * and is skipped entirely on touch devices — so it won't interfere with
 * mobile or a narrow resized browser window. If you're testing and don't
 * see it, make sure your window/viewport is wider than 640px.
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

    // Re-scan periodically for newly-mounted links/buttons (e.g. after the
    // preloader unmounts and reveals the rest of the page)
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
      {/* Small solid red dot — tracks instantly, sits above the ring */}
      <motion.div
        style={{ translateX: x, translateY: y }}
        className="absolute left-0 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff2a2a]"
      />

      {/* Blend-mode ring: inverts against whatever is underneath it,
          so it's always visible — red hero, white sections, black footer */}
      <motion.div
        style={{
          translateX: ringX,
          translateY: ringY,
          mixBlendMode: "difference",
        }}
        animate={{
          width: hovering ? 64 : 34,
          height: hovering ? 64 : 34,
          backgroundColor: hovering ? "#ffffff" : "rgba(255,255,255,0)",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white"
      />
    </div>
  );
}