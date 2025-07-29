import TechStackSection from "../../components/sections/TechStack";
import HeroSection from "../../components/sections/Hero";
import ExperienceSection from "../../components/sections/Experience";
import ProjectsSection from "../../components/sections/Projects";
import ContactSection from "../../components/sections/Contact";
import { getAllProjects } from "../data/get-all-projects";

export default async function Home() {
  const projects = await getAllProjects();

  return (
    <>
      <HeroSection />
      <TechStackSection />
      <ExperienceSection />
      <ProjectsSection projects={projects} />
      <ContactSection />
    </>
  );
}
