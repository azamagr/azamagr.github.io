import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// For a *username.github.io* repo, GitHub Pages serves the site from the
// domain root, so `base` must stay "/". (If you ever move this to a normal
// project repo instead — e.g. github.com/azamagr/portfolio — you'd change
// base to "/portfolio/" and deploy to https://azamagr.github.io/portfolio/.)
export default defineConfig({
  plugins: [react()],
  base: "/azamagr.github.io/",
});