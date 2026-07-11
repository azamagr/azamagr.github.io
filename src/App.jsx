import React from "react";
import { ThemeProvider } from "./ThemeContext";
import Preloader from "./Preloader";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import ProcessTimeline from "./ProcessTimeline";
import Projects from "./Projects";
import SkillsMatrix from "./SkillsMatrix";
import Contact from "./Contact";
import Footer from "./Footer";

export default function App() {
  return (
    <ThemeProvider>
      <Preloader>
        <Navbar />
        <Hero bgImageSrc="/IMG/video.png" photoSrc="/IMG/pass.png" />
        <About photoSrc="/IMG/azam.jpg" />
        <ProcessTimeline />
        <SkillsMatrix />
        <Projects />
        <Contact />
        <Footer />
      </Preloader>
    </ThemeProvider>
  );
}
