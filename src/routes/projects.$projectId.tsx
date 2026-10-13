import { createFileRoute, notFound } from '@tanstack/react-router';
import { ProjectDetail } from '@/components/portfolio-projects';
import { projects } from '@/lib/portfolio-data';
import { portfolioHead } from '@/lib/portfolio-head';
export const Route=createFileRoute('/projects/$projectId')({loader:({params})=>{const project=projects.find(project=>project.id===params.projectId);if(!project)throw notFound();return project},head:({loaderData})=>portfolioHead(loaderData?.title.en??'Project unavailable',loaderData?.description.en??'This project could not be found in Baraa’s portfolio.'),component:Detail});
function Detail(){const project=Route.useLoaderData();return <ProjectDetail key={project.id} project={project}/>}
