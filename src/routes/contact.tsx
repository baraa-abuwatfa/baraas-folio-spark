import { createFileRoute } from '@tanstack/react-router';
import { ContactPage } from '@/components/portfolio-sections';
import { portfolioHead } from '@/lib/portfolio-head';
export const Route=createFileRoute('/contact')({head:()=>portfolioHead('Contact Baraa — Projects & Opportunities','Contact Baraa Mahmoud Abu Watfa for job opportunities, freelance collaboration, QA work, automation, and creative project inquiries.'),component:ContactPage});
