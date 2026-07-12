import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Preloader
 * ---------------------------------------------------------------------------
 * Fullscreen animated preloader for "Azam."
 *
 * Sequence:
 *  1. Dark, transparent "Azam." sits as a static background layer.
 *  2. A white "Azam." is layered exactly on top, clipped from the bottom.
 *     A clip-path animation reveals it upward (water-fill) over 1.6s.
 *  3. After the fill completes (plus a short hold), the entire red panel
 *     slides upward like a shutter, revealing the page underneath.
 *  4. The logo itself scales down + fades out via AnimatePresence as the
 *     shutter opens, so it exits cleanly rather than just being covered.
 *
 * Usage:
 *   <Preloader onComplete={() => console.log("done")}>
 *     <YourSiteContent />
 *   </Preloader>
 *
 * The children are rendered underneath the preloader immediately (so
 * layout/images can start loading), and are simply revealed once the
 * shutter finishes.
 */

const FILL_DURATION = 1.6; // seconds — water-fill clip-path animation
const HOLD_DURATION = 0.35; // seconds — brief pause once fill completes
const SHUTTER_DURATION = 0.9; // seconds — shutter-open + logo exit

const EASE_FILL = [0.65, 0, 0.35, 1];
const EASE_SHUTTER = [0.76, 0, 0.24, 1];

export default function Preloader({ children, onComplete }) {
  // stage: 'filling' -> 'holding' -> 'exiting' -> 'done'
  const [stage, setStage] = useState("filling");

  const handleComplete = useCallback(() => {
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    const t = setTimeout(() => setStage("holding"), FILL_DURATION * 1000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (stage !== "holding") return;
    const t = setTimeout(() => setStage("exiting"), HOLD_DURATION * 1000);
    return () => clearTimeout(t);
  }, [stage]);

  useEffect(() => {
    if (stage !== "exiting") return;
    const t = setTimeout(() => {
      setStage("done");
      handleComplete();
    }, SHUTTER_DURATION * 1000);
    return () => clearTimeout(t);
  }, [stage, handleComplete]);

  return (
    <>
      <AnimatePresence>
        {stage !== "done" && (
          <motion.div
            key="preloader-shutter"
            className="fixed inset-0 z-[100000] flex items-center justify-center overflow-hidden bg-white transition-colors duration-300 dark:bg-[#0a0a0a]"
            initial={{ y: 0 }}
            animate={{ y: stage === "exiting" ? "-100%" : 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: SHUTTER_DURATION, ease: EASE_SHUTTER }}
          >
            <motion.div
              className="relative select-none px-4"
              animate={
                stage === "exiting"
                  ? { scale: 0.82, opacity: 0 }
                  : { scale: 1, opacity: 1 }
              }
              transition={{ duration: 0.55, ease: "easeInOut" }}
            >
              {/* Background layer: dark, transparent version of the logo */}
              <span
                aria-hidden="true"
                className="block font-black leading-none tracking-tighter text-black/15 dark:text-white/15"
                style={{
                  fontSize: "clamp(2.5rem, 12vw, 9rem)",
                  fontFamily:
                    "'Helvetica Neue', Arial, ui-sans-serif, sans-serif",
                }}
              >
                Azam Agr.
              </span>

              {/* Foreground layer: white logo, water-fill clip-path reveal */}
              <motion.span
                className="absolute inset-0 block font-black leading-none tracking-tighter text-black dark:text-white"
                style={{
                  fontSize: "clamp(2.5rem, 12vw, 9rem)",
                  fontFamily:
                    "'Helvetica Neue', Arial, ui-sans-serif, sans-serif",
                }}
                initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                transition={{ duration: FILL_DURATION, ease: EASE_FILL }}
              >
                Azam Agr.
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Site content sits underneath and is revealed as the shutter opens */}
      {children}
    </>
  );
}
