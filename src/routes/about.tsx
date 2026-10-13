import { createFileRoute } from '@tanstack/react-router';
import { AboutSection } from '@/components/portfolio-sections';
import { ContactBand } from '@/components/portfolio-layout';
import { portfolioHead } from '@/lib/portfolio-head';
export const Route=createFileRoute('/about')({head:()=>portfolioHead('About Baraa','Meet Baraa Mahmoud Abu Watfa, a quality assurance and software engineering professional with interests in practical AI and organized workflows.'),component:About});
function About(){return <><AboutSection standalone/><ContactBand/></>}
