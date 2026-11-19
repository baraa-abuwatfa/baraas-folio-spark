export type Language = "en" | "ar";
export type Bilingual = { en: string; ar: string };
export const bi = (en: string, ar: string): Bilingual => ({ en, ar });
export interface Identity {
  email: string;
  linkedin: string;
  github: string;
}
export interface Project {
  id: string;
  title: Bilingual;
  shortTitle: Bilingual;
  category: number;
  description: Bilingual;
  cover: "kaya" | "lawyer" | "audit" | "workflow" | "creative";
  technologies: Bilingual[];
  status: Bilingual;
  doc?: string;
  sections: { title: Bilingual; body: Bilingual }[];
}
export interface Service {
  name: Bilingual;
  description: Bilingual;
}
export interface SkillGroup {
  title: Bilingual;
  description: Bilingual;
  categories: Bilingual[];
  skills: Bilingual[];
  note?: Bilingual;
}
export interface ExperienceEntry {
  title: Bilingual;
  org: Bilingual;
  period: string;
  kind: "work" | "training";
  points: Bilingual[];
}
export interface PortfolioContent {
  identity: Identity;
  categories: Bilingual[];
  projects: Project[];
  services: Service[];
  skillGroups: SkillGroup[];
  experience: ExperienceEntry[];
}
/** Site content lives in the database (content_items). The original snapshot is in content-backup/. */
export const cvFile = "/files/Baraa_AbuWatfa_CV.pdf";
