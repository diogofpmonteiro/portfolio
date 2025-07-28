import TechStackSection from "../../components/sections/TechStack";
import HeroSection from "../../components/sections/Hero";
import ExperienceSection from "../../components/sections/Experience";
import ProjectsSection from "../../components/sections/Projects";
import ContactSection from "../../components/sections/Contact";

export default async function Home() {
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
