import { createFileRoute } from "@tanstack/react-router";
import { ExperienceSection } from "@/components/portfolio-sections";
import { ContactBand } from "@/components/portfolio-layout";
import { portfolioHead } from "@/lib/portfolio-head";
export const Route = createFileRoute("/experience")({
  head: () =>
    portfolioHead(
      "Experience — QA, System Analysis & Training",
      "Baraa Mahmoud Abu Watfa’s professional experience at Devun and training at Gaza Sky Geeks and Gaza Municipality.",
    ),
  component: () => (
    <>
      <ExperienceSection />
      <ContactBand />
    </>
  ),
});
