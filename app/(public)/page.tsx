import TechStackSection from "./_components/TechStack";
import HeroSection from "./_components/Hero";
import ExperienceSection from "./_components/Experience";
import ProjectsSection from "./_components/Projects";
import ContactSection from "./_components/Contact";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TechStackSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
