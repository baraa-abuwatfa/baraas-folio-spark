import { createFileRoute } from '@tanstack/react-router';
import { SkillsSection } from '@/components/portfolio-sections';
import { ContactBand } from '@/components/portfolio-layout';
import { portfolioHead } from '@/lib/portfolio-head';
export const Route=createFileRoute('/skills')({head:()=>portfolioHead('Skills — Testing, AI & Documentation','Discover Baraa’s QA and software testing, practical AI, workflow automation, documentation, and front-end fundamentals.'),component:Skills});
function Skills(){return <><SkillsSection standalone/><ContactBand/></>}
