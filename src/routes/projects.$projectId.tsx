import { createFileRoute, notFound } from "@tanstack/react-router";
import { ProjectDetail } from "@/components/portfolio-projects";
import { contentQuery } from "@/lib/content-query";
import { portfolioHead } from "@/lib/portfolio-head";
export const Route = createFileRoute("/projects/$projectId")({
  loader: async ({ params, context }) => {
    const content = await context.queryClient.ensureQueryData(contentQuery);
    const project = content.projects.find((project) => project.id === params.projectId);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) =>
    portfolioHead(
      loaderData?.title.en ?? "Project unavailable",
      loaderData?.description.en ?? "This project could not be found in Baraa’s portfolio.",
    ),
  component: Detail,
  errorComponent: () => (
    <div role="alert" className="container section">
      This project could not be loaded. Please refresh the page.
    </div>
  ),
  notFoundComponent: () => (
    <div className="container section">This project could not be found.</div>
  ),
});
function Detail() {
  const project = Route.useLoaderData();
  return <ProjectDetail key={project.id} project={project} />;
}
