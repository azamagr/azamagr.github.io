import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

/**
 * ThemeContext
 * ---------------------------------------------------------------------------
 * Lightweight dark/bright theme provider. Toggles a "dark" class on the
 * <html> element, which Tailwind's `dark:` variant hooks into.
 *
 * REQUIRES in tailwind.config.js:
 *   module.exports = { darkMode: "class", ... }
 *
 * Wrap your app once at the root:
 *   <ThemeProvider>
 *     <App />
 *   </ThemeProvider>
 *
 * Then anywhere:
 *   const { theme, toggleTheme } = useTheme();
 *
 * Persistence: remembers the user's choice in localStorage, and falls back
 * to the OS-level `prefers-color-scheme` on first visit.
 */

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  // Resolve initial theme once on mount (localStorage → OS preference → dark)
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("azam-portfolio-theme");
      if (stored === "dark" || stored === "light") {
        setTheme(stored);
        return;
      }
    } catch {
      // localStorage unavailable (private mode, SSR, etc.) — ignore
    }
    const prefersLight =
      window.matchMedia?.("(prefers-color-scheme: light)").matches;
    setTheme(prefersLight ? "light" : "dark");
  }, []);

  // Sync the "dark" class on <html> and persist the choice
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      window.localStorage.setItem("azam-portfolio-theme", theme);
    } catch {
      // ignore write failures
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
