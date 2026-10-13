import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Language, Bilingual } from "@/lib/portfolio-data";
const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
  t: (value: Bilingual) => string;
}>({ language: "en", setLanguage: () => {}, t: (value) => value.en });
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  useEffect(() => {
    try {
      if (localStorage.getItem("baraa-language") === "ar") setLanguage("ar");
    } catch {
      /* preference storage can be unavailable */
    }
  }, []);
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);
  const change = (value: Language) => {
    setLanguage(value);
    try {
      localStorage.setItem("baraa-language", value);
    } catch {
      /* optional preference */
    }
  };
  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: change, t: (value) => value[language] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
export const useLanguage = () => useContext(LanguageContext);
