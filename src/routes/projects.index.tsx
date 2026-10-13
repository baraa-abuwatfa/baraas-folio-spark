import { createFileRoute } from "@tanstack/react-router";
import { ProjectsPage } from "@/components/portfolio-projects";
import { portfolioHead } from "@/lib/portfolio-head";
export const Route = createFileRoute("/projects/")({
  head: () =>
    portfolioHead(
      "My Projects — QA, Automation & Creative Work",
      "Explore five projects: KAYA Store QA, Lawyer Application testing, a website QA audit, Task Delay Alert System, and AI Creative Studio.",
    ),
  component: ProjectsPage,
});
