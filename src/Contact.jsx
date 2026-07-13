import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Globe, Mail, MapPin, Phone } from "lucide-react";

/**
 * Contact
 * ---------------------------------------------------------------------------
 * "Get In Touch" section — bright red (#ff2a2a) accents, but the base
 * background/text now follows the site-wide dark/bright theme instead of
 * being locked to dark mode.
 *
 *  - Left: large statement headline, contact details (email / location /
 *    phone), and three "magnetic" social icons that nudge toward the
 *    cursor within a small radius, then spring back on mouse-leave.
 *  - Right: a minimal form (Name / Email / Subject / Message) with
 *    transparent, bottom-border-only inputs that glow red on focus, and
 *    a pill submit button with a liquid-fill hover effect.
 *
 * Usage:
 *   <Contact onSubmit={(data) => console.log(data)} />
 */

export default function Contact({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="bg-white py-28 transition-colors duration-300 dark:bg-[#111111] sm:py-32"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 sm:px-10 md:grid-cols-2 md:gap-12">
        {/* Left column */}
        <div>
          <span className="inline-block rounded-full border border-black/10 bg-black/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-black/60 dark:border-white/15 dark:bg-white/5 dark:text-white/60">
            Get In Touch
          </span>

          <h2 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight text-black transition-colors duration-300 dark:text-white sm:text-5xl">
            Let's build something scalable together.
          </h2>

          <div className="mt-10 space-y-5">
            <ContactRow icon={<Mail className="h-4.5 w-4.5" />}>
              <a
                href="mailto:azamghafoorreal@gmail.com"
                className="transition-colors duration-300 hover:text-[#ff2a2a]"
              >
                azamghafoorreal@gmail.com
              </a>
            </ContactRow>
            <ContactRow icon={<MapPin className="h-4.5 w-4.5" />}>
              Kasur, Punjab, Pakistan
            </ContactRow>
            <ContactRow icon={<Phone className="h-4.5 w-4.5" />}>
              <a
                href="tel:+923256830508"
                className="transition-colors duration-300 hover:text-[#ff2a2a]"
              >
                +92-325-6830508
              </a>
            </ContactRow>
          </div>

          <div className="mt-12 flex items-center gap-5">
            <MagneticIcon href="https://www.linkedin.com/in/azamagr" label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </MagneticIcon>
            <MagneticIcon href="https://github.com/azamagr" label="GitHub">
              <Github className="h-5 w-5" />
            </MagneticIcon>
            <MagneticIcon href="https://azamagr.github.io/" label="Portfolio">
              <Globe className="h-5 w-5" />
            </MagneticIcon>
          </div>
        </div>

        {/* Right column: form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <FormField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <FormField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
          <FormField
            label="Subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
          />
          <FormField
            label="Message"
            name="message"
            as="textarea"
            rows={4}
            value={form.message}
            onChange={handleChange}
          />

          <LiquidButton>{sent ? "Message Sent ✓" : "Send Message"}</LiquidButton>
        </form>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- */

function ContactRow({ icon, children }) {
  return (
    <div className="flex items-center gap-3 text-sm text-black/70 transition-colors duration-300 dark:text-white/70">
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 text-black/60 dark:border-white/15 dark:text-white/60">
        {icon}
      </span>
      {children}
    </div>
  );
}

function MagneticIcon({ href, label, children }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: relX * 0.35, y: relY * 0.35 });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.4 }}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 text-black/70 transition-colors duration-300 hover:border-[#ff2a2a] hover:text-black dark:border-white/15 dark:text-white/70 dark:hover:text-white"
    >
      {children}
    </motion.a>
  );
}

function FormField({ label, name, value, onChange, type = "text", as, rows }) {
  const Tag = as === "textarea" ? "textarea" : "input";
  return (
    <label className="group relative block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-black/40 dark:text-white/40">
        {label}
      </span>
      <Tag
        name={name}
        type={as === "textarea" ? undefined : type}
        rows={rows}
        value={value}
        onChange={onChange}
        required
        className="peer w-full resize-none border-0 border-b border-black/20 bg-transparent pb-3 text-black outline-none transition-colors duration-300 placeholder:text-black/30 focus:border-transparent dark:border-white/20 dark:text-white dark:placeholder:text-white/30"
      />
      {/* Glow underline that grows + glows on focus */}
      <span className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#ff2a2a] shadow-[0_0_12px_rgba(255,42,42,0.8)] transition-transform duration-300 peer-focus:scale-x-100" />
    </label>
  );
}

function LiquidButton({ children }) {
  return (
    <button
      type="submit"
      className="group relative mt-2 w-full overflow-hidden rounded-full border border-black/20 px-8 py-4 text-sm font-semibold text-black transition-colors duration-300 dark:border-white/20 dark:text-white sm:w-fit"
    >
      {/* Liquid fill layer */}
      <span className="absolute inset-0 -z-0 origin-bottom scale-y-0 bg-[#ff2a2a] transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-y-100" />
      <span className="relative z-10 text-black transition-colors duration-300 group-hover:text-white dark:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
        {children}
      </span>
    </button>
  );
}
