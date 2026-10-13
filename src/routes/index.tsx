import { createFileRoute } from '@tanstack/react-router';
import { PortfolioHome } from '@/components/portfolio-home';
import { portfolioHead } from '@/lib/portfolio-head';
export const Route=createFileRoute('/')({head:()=>portfolioHead('Baraa Mahmoud Abu Watfa — Software, QA & Automation','Explore Baraa’s software engineering, quality assurance, AI-assisted creative work, and workflow automation portfolio.'),component:PortfolioHome});
