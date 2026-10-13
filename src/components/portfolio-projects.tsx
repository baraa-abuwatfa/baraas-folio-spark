import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCheck,
  FileCheck2,
  GitBranch,
  Image,
  Scale,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { bi, categories, projects, type Project } from "@/lib/portfolio-data";
import { useLanguage } from "./portfolio-language";
export function ProjectCover({ project, detail = false }: { project: Project; detail?: boolean }) {
  const { t } = useLanguage();
  return (
    <div
      className={`project-cover cover-${project.cover} ${detail ? "detail-cover" : ""}`}
      aria-label={t(bi("Abstract project cover", "غلاف تجريدي للمشروع"))}
    >
      {project.cover === "kaya" ? (
        <div className="cover-wordmark">
          KAYA
          <small>{t(bi("SKINCARE · E-COMMERCE", "العناية بالبشرة · التجارة الإلكترونية"))}</small>
        </div>
      ) : project.cover === "lawyer" ? (
        <Scale className="cover-icon" />
      ) : project.cover === "audit" ? (
        <FileCheck2 className="cover-icon" />
      ) : project.cover === "workflow" ? (
        <GitBranch className="cover-icon" />
      ) : (
        <Image className="cover-icon" />
      )}
      <span className="cover-lines" />
      <span className="cover-corner">
        <CheckCheck size={12} />
        {project.cover === "creative"
          ? t(bi("Media coming soon", "الوسائط قريبًا"))
          : t(bi("PROJECT STUDY", "دراسة مشروع"))}
      </span>
    </div>
  );
}
export function ProjectCard({ project }: { project: Project }) {
  const { t } = useLanguage();
  return (
    <article className="project-card">
      <Link
        to="/projects/$projectId"
        params={{ projectId: project.id }}
        tabIndex={-1}
        aria-hidden="true"
      >
        <ProjectCover project={project} />
      </Link>
      <div className="project-content">
        <span className="project-category">
          {t(categories[project.category] ?? bi("Project", "مشروع"))}
        </span>
        <h3>{t(project.shortTitle)}</h3>
        <p>{t(project.description)}</p>
        <Link className="text-link" to="/projects/$projectId" params={{ projectId: project.id }}>
          {t(bi("View Project", "عرض المشروع"))}
          <ArrowUpRight className="rtl-arrow" size={15} />
        </Link>
      </div>
    </article>
  );
}
export function ProjectGrid({ featured = false }: { featured?: boolean }) {
  return (
    <div className="projects-grid">
      {(featured ? projects.slice(0, 3) : projects).map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
export function ProjectsPage() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState(0);
  return (
    <div className="container project-bottom reveal">
      <header className="page-header">
        <span className="eyebrow">{t(bi("A SELECTION OF MY WORK", "مختارات من أعمالي"))}</span>
        <h1 className="page-title">
          {t(bi("My Projects", "مشاريعي"))}
          <span className="text-primary">.</span>
        </h1>
        <p className="page-intro">
          {t(
            bi(
              "From thoughtful testing to purposeful automation and creative exploration. Each project reflects a different side of how I work.",
              "من الاختبارات المدروسة إلى الأتمتة الهادفة والاستكشاف الإبداعي. يعكس كل مشروع جانبًا مختلفًا من عملي.",
            ),
          )}
        </p>
      </header>
      <div
        className="project-filters"
        role="group"
        aria-label={t(bi("Filter projects", "تصفية المشاريع"))}
      >
        {categories.map((category, index) => (
          <Button
            key={index}
            variant={filter === index ? "default" : "outline"}
            aria-pressed={filter === index}
            onClick={() => setFilter(index)}
          >
            {t(category)}
          </Button>
        ))}
      </div>
      <div className="projects-grid" aria-live="polite">
        {projects
          .filter((project) => filter === 0 || project.category === filter)
          .map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
      </div>
    </div>
  );
}
const workflow = [
  bi("Task Data Source", "مصدر بيانات المهام"),
  bi("Read Task Records", "قراءة سجلات المهام"),
  bi("Check Status and Deadline", "فحص الحالة والموعد النهائي"),
  bi("Evaluate Delay Conditions", "تقييم شروط التأخير"),
  bi("Identify Overdue Tasks", "تحديد المهام المتأخرة"),
  bi("Send Email Notification", "إرسال إشعار بريدي"),
  bi("Follow-up", "المتابعة"),
];
const gallery = [
  bi("AI-Generated Images", "صور مولدة بالذكاء الاصطناعي"),
  bi("AI Video Projects", "مشاريع فيديو بالذكاء الاصطناعي"),
  bi("Advertising & Promotional Campaigns", "حملات إعلانية وترويجية"),
  bi("Creative Experiments", "تجارب إبداعية"),
];
export function ProjectDetail({ project }: { project: Project }) {
  const { t } = useLanguage();
  const [galleryFilter, setGalleryFilter] = useState(0);
  const index = projects.findIndex((item) => item.id === project.id);
  const prev = projects[(index + projects.length - 1) % projects.length] ?? project;
  const next = projects[(index + 1) % projects.length] ?? project;
  return (
    <div className="container reveal">
      <header className="project-detail-head">
        <Link to="/projects" className="text-link back-link">
          <ArrowRight className="rotate-180 rtl-arrow" size={14} />
          {t(bi("Back to All Projects", "العودة إلى جميع المشاريع"))}
        </Link>
        <div className="project-category">
          {t(categories[project.category] ?? bi("Project", "مشروع"))}
        </div>
        <h1>{t(project.title)}</h1>
        <p>{t(project.description)}</p>
      </header>
      <ProjectCover project={project} detail />
      <div className="detail-layout">
        <aside className="detail-sidebar">
          <div>
            <span>{t(bi("CATEGORY", "الفئة"))}</span>
            <strong>{t(categories[project.category] ?? bi("Project", "مشروع"))}</strong>
          </div>
          <div>
            <span>{t(bi("FOCUS", "التركيز"))}</span>
            <strong>
              {t(
                project.category === 1
                  ? bi("Testing & documentation", "الاختبار والتوثيق")
                  : project.category === 2
                    ? bi("Workflow design & follow-up", "تصميم سير العمل والمتابعة")
                    : bi("Creative direction & prompts", "التوجيه الإبداعي والأوامر"),
              )}
            </strong>
          </div>
        </aside>
        <div>
          {project.sections.map((section, index) => (
            <section className="detail-section" key={index}>
              <h2>{t(section.title)}</h2>
              <p>{t(section.body)}</p>
              {project.cover === "workflow" && index === 3 && (
                <figure>
                  <div className="workflow">
                    {workflow.map((step, index) => (
                      <div className="workflow-step" key={index}>
                        <span>0{index + 1}</span>
                        {t(step)}
                        {index < workflow.length - 1 && (
                          <ArrowRight size={15} className="rtl-arrow" />
                        )}
                      </div>
                    ))}
                  </div>
                  <figcaption className="workflow-caption">
                    {t(
                      bi(
                        "Workflow illustration — not an actual application screenshot.",
                        "توضيح لسير العمل — ليس صورة فعلية للتطبيق.",
                      ),
                    )}
                  </figcaption>
                </figure>
              )}
            </section>
          ))}
          {project.doc && (
            <section className="documentation-panel">
              <h2>{t(bi("Original Project Documentation", "توثيق المشروع الأصلي"))}</h2>
              <p>
                {t(
                  bi(
                    "The original spreadsheet is the source of truth for detailed records and statuses. These public documents were accessible during review; no unverified aggregate statistics are shown.",
                    "الجدول الأصلي هو مصدر الحقيقة للسجلات التفصيلية والحالات. كانت هذه المستندات العامة متاحة أثناء المراجعة؛ لا تُعرض إحصاءات إجمالية غير مؤكدة.",
                  ),
                )}
              </p>
              <div className="documentation-actions">
                {project.cover === "audit" && (
                  <Button asChild variant="outline">
                    <a href={project.doc} target="_blank" rel="noopener noreferrer">
                      {t(bi("View Test Cases & Analytics", "عرض حالات الاختبار والتحليلات"))}
                      <ArrowUpRight />
                    </a>
                  </Button>
                )}
                <Button asChild>
                  <a href={project.doc} target="_blank" rel="noopener noreferrer">
                    {t(
                      project.cover === "audit"
                        ? bi("View Original QA Documentation", "عرض توثيق ضمان الجودة الأصلي")
                        : bi("View Original Test Documentation", "عرض توثيق الاختبارات الأصلي"),
                    )}
                    <ArrowUpRight />
                  </a>
                </Button>
              </div>
            </section>
          )}
          {project.cover === "creative" && (
            <section>
              <h2 className="text-xl font-semibold">
                {t(bi("Creative Gallery", "المعرض الإبداعي"))}
              </h2>
              <div className="project-filters">
                {gallery.map((item, index) => (
                  <Button
                    key={index}
                    variant={galleryFilter === index ? "default" : "outline"}
                    aria-pressed={galleryFilter === index}
                    onClick={() => setGalleryFilter(index)}
                  >
                    {t(item)}
                  </Button>
                ))}
              </div>
              <div className="empty-gallery" aria-live="polite">
                <Image size={36} />
                <h3>{t(gallery[galleryFilter] ?? bi("Creative Gallery", "المعرض الإبداعي"))}</h3>
                <p>
                  {t(
                    bi(
                      "Creative projects and media will be added here soon.",
                      "ستُضاف المشاريع الإبداعية والوسائط هنا قريبًا.",
                    ),
                  )}
                </p>
              </div>
            </section>
          )}
        </div>
      </div>
      <nav
        className="project-pagination"
        aria-label={t(bi("Project navigation", "التنقل بين المشاريع"))}
      >
        <Link to="/projects/$projectId" params={{ projectId: prev.id }}>
          <small>{t(bi("PREVIOUS PROJECT", "المشروع السابق"))}</small>
          {t(prev.shortTitle)}
        </Link>
        <Link to="/projects/$projectId" params={{ projectId: next.id }}>
          <small>{t(bi("NEXT PROJECT", "المشروع التالي"))}</small>
          {t(next.shortTitle)}
        </Link>
      </nav>
    </div>
  );
}
