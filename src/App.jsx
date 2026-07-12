import React from "react";
import { ThemeProvider } from "./ThemeContext";
import Preloader from "./Preloader";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Education from "./Education";
import Certifications from "./Certifications";
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
        <Hero bgImageSrc="/IMG/video.png" />
        <About photoSrc="/IMG/pass.png" />
        <Education />
        <Certifications />
        <ProcessTimeline />
        <SkillsMatrix />
        <Projects />
        <Contact />
        <Footer />
      </Preloader>
    </ThemeProvider>
  );
}
