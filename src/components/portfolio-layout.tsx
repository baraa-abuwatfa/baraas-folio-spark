import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, Github, Linkedin, Mail, Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bi, identity } from "@/lib/portfolio-data";
import { useLanguage } from "./portfolio-language";
import { PortfolioAssistant } from "./portfolio-assistant";
export function SocialLinks() {
  const { t } = useLanguage();
  return (
    <>
      <a
        className="social-link"
        href={identity.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t(bi("Baraa on GitHub", "براء على GitHub"))}
      >
        <Github size={17} />
      </a>
      <a
        className="social-link"
        href={identity.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t(bi("Baraa on LinkedIn", "براء على LinkedIn"))}
      >
        <Linkedin size={17} />
      </a>
      <a
        className="social-link"
        href={`mailto:${identity.email}`}
        aria-label={t(bi("Email Baraa", "راسل براء"))}
      >
        <Mail size={18} />
      </a>
    </>
  );
}
const navItems = [
  { to: "/" as const, label: bi("Home", "الرئيسية") },
  { to: "/about" as const, label: bi("About", "عني") },
  { to: "/skills" as const, label: bi("Skills", "المهارات") },
  { to: "/projects" as const, label: bi("Projects", "المشاريع") },
  { to: "/contact" as const, label: bi("Contact", "التواصل") },
];
export function PortfolioLayout({ children }: { children: ReactNode }) {
  const { t, language, setLanguage } = useLanguage();
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setMenu(false);
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname]);
  return (
    <>
      <a href="#main-content" className="skip-link">
        {t(bi("Skip to content", "انتقل إلى المحتوى"))}
      </a>
      <header className="container site-header">
        <Link to="/" className="brand" aria-label={t(bi("Baraa home", "براء — الرئيسية"))}>
          Baraa<span className="brand-dot">.</span>
        </Link>
        <nav
          id="main-nav"
          aria-label={t(bi("Main navigation", "التنقل الرئيسي"))}
          className={`navigation ${menu ? "open" : ""}`}
        >
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="nav-link"
              activeOptions={{ exact: item.to === "/" }}
            >
              {t(item.label)}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Button
            variant="ghost"
            className="language-button"
            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
            aria-label={t(bi("Switch to Arabic", "التبديل إلى الإنجليزية"))}
          >
            <Globe size={14} />
            <span>{language === "en" ? "العربية" : "English"}</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="menu-button"
            aria-expanded={menu}
            aria-controls="main-nav"
            aria-label={t(
              bi(menu ? "Close menu" : "Open menu", menu ? "إغلاق القائمة" : "فتح القائمة"),
            )}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </Button>
        </div>
      </header>
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <footer className="container site-footer">
        <div className="footer-top">
          <Link to="/" className="brand">
            Baraa<span className="brand-dot">.</span>
          </Link>
          <p className="footer-copy">
            {t(bi("Thoughtful engineering. Reliable solutions.", "هندسة مدروسة. حلول موثوقة."))}
          </p>
          <div className="footer-links">
            <SocialLinks />
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Baraa.{" "}
            {t(bi("All rights reserved.", "جميع الحقوق محفوظة."))}
          </span>
          <span>
            {t(
              bi(
                "Built with care, curiosity, and a little creativity.",
                "صُنع بعناية وفضول ولمسة إبداع.",
              ),
            )}
          </span>
        </div>
      </footer>
      <PortfolioAssistant />
    </>
  );
}
export function ContactBand() {
  const { t } = useLanguage();
  return (
    <section className="contact-band">
      <div className="container contact-band-inner">
        <div>
          <span className="section-kicker">{t(bi("LET’S CONNECT", "لنتواصل"))}</span>
          <h2>{t(bi("Have an idea in mind?", "لديك فكرة؟"))}</h2>
          <p>
            {t(
              bi(
                "Let’s turn it into something useful, thoughtful, and reliable.",
                "لنحوّلها إلى شيء مفيد ومدروس وموثوق.",
              ),
            )}
          </p>
        </div>
        <Button asChild size="lg">
          <Link to="/contact">
            {t(bi("Let’s Talk", "لنتحدث"))}
            <ArrowUpRight className="rtl-arrow" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
