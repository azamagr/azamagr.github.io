import React from "react";
import { ThemeProvider } from "./ThemeContext";
import CustomCursor from "./CustomCursor";
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
      <CustomCursor />
      <Preloader>
        <Navbar />
        <Hero bgImageSrc="/IMG/video.png" />
        <About photoSrc="/IMG/pass.png" />
        <ProcessTimeline />
        <SkillsMatrix />
        <Projects />
        <Education />
        <Certifications />
        <Contact />
        <Footer />
      </Preloader>
    </ThemeProvider>
  );
}