import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, ChevronLeft, Mail, MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import portrait from "@/assets/baraa-character.asset.json";
import { bi, identity, services } from "@/lib/portfolio-data";
import { inquirySchema } from "@/lib/inquiry-schema";
import { useLanguage } from "./portfolio-language";
import { answerCvQuestion, cvMissing, cvTopics } from "@/lib/cv-profile";
import { UserRound } from "lucide-react";
type View =
  | "welcome"
  | "services"
  | "service"
  | "form"
  | "review"
  | "contact"
  | "success"
  | "about";
type CvTurn = { q: string; topic: number | null };
const initial = {
  service: "",
  title: "",
  description: "",
  timeline: "",
  budget: "",
  name: "",
  email: "",
  website: "",
};
export function PortfolioAssistant() {
  const { t, language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("welcome");
  const [selected, setSelected] = useState(0);
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<string[]>([]);
  const [failure, setFailure] = useState("");
  const [sending, setSending] = useState(false);
  const [freeText, setFreeText] = useState("");
  const [fallback, setFallback] = useState(false);
  const [cvTurns, setCvTurns] = useState<CvTurn[]>([]);
  const [cvText, setCvText] = useState("");
  const [cvPicking, setCvPicking] = useState(true);
  const askCv = (q: string, topic: number | null) => {
    setCvTurns((prev) => [...prev, { q, topic }]);
    setCvPicking(false);
  };
  const submitCv = (event: FormEvent) => {
    event.preventDefault();
    const q = cvText.trim();
    if (!q) return;
    const match = answerCvQuestion(q);
    askCv(q, match ? cvTopics.indexOf(match) : null);
    setCvText("");
  };
  const launcher = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  const first = useRef<HTMLButtonElement>(null);
  const submissionId = useRef("");
  const lastAttempt = useRef(0);
  useEffect(() => {
    if (open) first.current?.focus();
    else launcher.current?.focus();
  }, [open]);
  const close = () => setOpen(false);
  const startInquiry = (service?: number) => {
    if (service !== undefined) setForm((prev) => ({ ...prev, service: String(service) }));
    setView("form");
    setErrors([]);
    setFailure("");
  };
  const label = (field: string) =>
    ({
      service: t(bi("Selected Service", "الخدمة المختارة")),
      title: t(bi("Project Title or Short Summary", "عنوان المشروع أو ملخص قصير")),
      description: t(bi("Project Description and Requirements", "وصف المشروع والمتطلبات")),
      timeline: t(bi("Preferred Timeline", "المدة المفضلة")),
      budget: t(bi("Budget Range", "الميزانية التقريبية")),
      name: t(bi("Customer Name", "اسم العميل")),
      email: t(bi("Customer Email", "البريد الإلكتروني")),
    })[field] ?? field;
  const review = (event: FormEvent) => {
    event.preventDefault();
    if (!submissionId.current) submissionId.current = crypto.randomUUID();
    const parsed = inquirySchema.safeParse({
      ...form,
      service: form.service === "" ? -1 : Number(form.service),
      submissionId: submissionId.current,
      confirmed: true,
    });
    if (!parsed.success) {
      setErrors([...new Set(parsed.error.issues.map((issue) => String(issue.path[0])))]);
      return;
    }
    setErrors([]);
    setFailure("");
    setView("review");
  };
  const send = async () => {
    if (sending) return;
    if (Date.now() - lastAttempt.current < 5000) {
      setFailure("wait");
      return;
    }
    lastAttempt.current = Date.now();
    setSending(true);
    setFailure("");
    try {
      const result = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          service: Number(form.service),
          submissionId: submissionId.current,
          confirmed: true,
        }),
      });
      const data = (await result.json()) as { sent?: boolean; code?: string };
      if (!result.ok || data.sent !== true) {
        setFailure(data.code === "email_not_configured" ? "configuration" : "network");
        return;
      }
      setView("success");
    } catch {
      setFailure("network");
    } finally {
      setSending(false);
    }
  };
  const ask = (event: FormEvent) => {
    event.preventDefault();
    const input = freeText.trim().toLowerCase();
    if (!input) return;
    if (/contact|email|تواصل|بريد/.test(input)) setView("contact");
    else if (/inquiry|project|request|طلب|مشروع/.test(input)) startInquiry();
    else if (/service|automation|testing|خدم|أتمت|اختبار/.test(input)) setView("services");
    else {
      setFallback(true);
      setView("welcome");
    }
    setFreeText("");
  };
  const keyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    }
    if (event.key === "Tab") {
      const controls = panel.current?.querySelectorAll<HTMLElement>(
        'button:not(:disabled),a[href],input:not([tabindex="-1"]),select,textarea',
      );
      if (!controls?.length) return;
      const firstControl = controls[0];
      const lastControl = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === firstControl) {
        event.preventDefault();
        lastControl?.focus();
      } else if (!event.shiftKey && document.activeElement === lastControl) {
        event.preventDefault();
        firstControl?.focus();
      }
    }
  };
  return (
    <>
      {open && (
        <section
          ref={panel}
          className="chat-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="assistant-title"
          onKeyDown={keyDown}
        >
          <header className="chat-header">
            <img
              className="chat-avatar"
              src={portrait.url}
              alt={t(bi("Baraa’s supplied character portrait", "الصورة الشخصية المرسومة لبراء"))}
            />
            <div>
              <h2 id="assistant-title">{t(bi("Baraa’s Assistant", "مساعد براء"))}</h2>
              <p>{t(bi("Portfolio Assistant", "المساعد الشخصي"))}</p>
            </div>
            <div className="chat-header-controls">
              <Button
                ref={first}
                variant="ghost"
                onClick={() => setLanguage(language === "en" ? "ar" : "en")}
                aria-label={t(bi("Switch assistant to Arabic", "التبديل إلى الإنجليزية"))}
              >
                {language === "en" ? "ع" : "EN"}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={close}
                aria-label={t(bi("Close assistant", "إغلاق المساعد"))}
              >
                <X />
              </Button>
            </div>
          </header>
          <div className="chat-body">
            {view === "welcome" && (
              <>
                <p className="assistant-text">
                  {fallback
                    ? t(
                        bi(
                          "I can help with the services and project inquiry options below. Please choose an option.",
                          "يمكنني مساعدتك بالخدمات وطلبات المشاريع أدناه. يرجى اختيار أحد الخيارات.",
                        ),
                      )
                    : t(
                        bi(
                          "Hi! Welcome to Baraa's portfolio. I'm here to help you explore the available services and submit a project inquiry. What would you like help with?",
                          "أهلًا وسهلًا بك في موقع براء! أنا هنا لمساعدتك في استكشاف الخدمات المتاحة وإرسال طلب مشروع. كيف يمكنني مساعدتك؟",
                        ),
                      )}
                </p>
                <div className="chat-options">
                  <Button variant="outline" onClick={() => setView("services")}>
                    {t(bi("Explore Services", "استكشف الخدمات"))}
                    <ArrowRight className="rtl-arrow" />
                  </Button>
                  <Button onClick={() => startInquiry()}>
                    {t(bi("Submit a Project Inquiry", "اطلب تنفيذ مشروع"))}
                    <Send />
                  </Button>
                  <Button variant="outline" onClick={() => setView("contact")}>
                    {t(bi("Contact Baraa", "تواصل مع براء"))}
                    <Mail />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCvPicking(true);
                      setView("about");
                    }}
                  >
                    {t(bi("About Baraa", "عن براء"))}
                    <UserRound />
                  </Button>
                </div>
                <form className="chat-input" onSubmit={ask}>
                  <input
                    value={freeText}
                    onChange={(event) => setFreeText(event.target.value)}
                    maxLength={300}
                    placeholder={t(
                      bi("Ask about services or an inquiry…", "اسأل عن الخدمات أو تقديم طلب…"),
                    )}
                    aria-label={t(bi("Message for assistant", "رسالة للمساعد"))}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    aria-label={t(bi("Send message", "إرسال الرسالة"))}
                  >
                    <Send />
                  </Button>
                </form>
              </>
            )}
            {view === "about" && (
              <>
                <p className="assistant-text">
                  {t(
                    bi(
                      "Ask me about Baraa’s professional background — experience, training, education, skills, volunteering, and certificates. Answers come from Baraa’s CV.",
                      "اسألني عن الخلفية المهنية لبراء — الخبرة والتدريب والتعليم والمهارات والتطوع والشهادات. الإجابات مأخوذة من سيرتها الذاتية.",
                    ),
                  )}
                </p>
                {cvTurns.map((turn, index) => (
                  <div key={index}>
                    <p className="chat-service-title">{turn.q}</p>
                    <p className="assistant-text" style={{ whiteSpace: "pre-line" }}>
                      {t(turn.topic === null ? cvMissing : cvTopics[turn.topic]!.answer)}
                    </p>
                  </div>
                ))}
                {cvPicking ? (
                  <>
                    <div className="chat-options">
                      {cvTopics.map((topic, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          onClick={() => askCv(t(topic.question), index)}
                        >
                          {t(topic.question)}
                          <ArrowRight className="rtl-arrow" />
                        </Button>
                      ))}
                    </div>
                    <form className="chat-input" onSubmit={submitCv}>
                      <input
                        value={cvText}
                        onChange={(event) => setCvText(event.target.value)}
                        maxLength={300}
                        placeholder={t(bi("Ask about Baraa…", "اسأل عن براء…"))}
                        aria-label={t(bi("Question about Baraa", "سؤال عن براء"))}
                      />
                      <Button
                        type="submit"
                        size="icon"
                        aria-label={t(bi("Send question", "إرسال السؤال"))}
                      >
                        <Send />
                      </Button>
                    </form>
                  </>
                ) : (
                  <div className="chat-options">
                    <Button onClick={() => setCvPicking(true)}>
                      {t(bi("Continue Conversation", "متابعة المحادثة"))}
                      <MessageCircle />
                    </Button>
                  </div>
                )}
                <div className="chat-actions">
                  <Button variant="ghost" onClick={() => setView("welcome")}>
                    <ChevronLeft className="rtl-arrow" />
                    {t(bi("Back to Chatbot Options", "العودة إلى خيارات المساعد"))}
                  </Button>
                </div>
              </>
            )}
            {view === "services" && (
              <>
                <p className="assistant-text">
                  {t(bi("What would you like to explore?", "ما الخدمة التي تود استكشافها؟"))}
                </p>
                <div className="chat-options">
                  {services.map((service, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => {
                        setSelected(index);
                        setView("service");
                      }}
                    >
                      {t(service.name)}
                      <ArrowRight className="rtl-arrow" />
                    </Button>
                  ))}
                </div>
              </>
            )}
            {view === "service" && (
              <>
                <h3 className="chat-service-title">
                  {t(services[selected]?.name ?? bi("Other Inquiry", "استفسار آخر"))}
                </h3>
                <p className="chat-service-description">
                  {t(
                    services[selected]?.description ??
                      bi("Tell Baraa about your request.", "أخبر براء عن طلبك."),
                  )}
                </p>
                <div className="chat-options">
                  <Button onClick={() => startInquiry(selected)}>
                    {t(bi("Submit an Inquiry", "إرسال طلب"))}
                    <Send />
                  </Button>
                  <Button variant="outline" onClick={() => setView("services")}>
                    {t(bi("Explore Other Services", "استكشف خدمات أخرى"))}
                  </Button>
                  <Button variant="ghost" onClick={() => setView("contact")}>
                    {t(bi("Contact Baraa", "تواصل مع براء"))}
                  </Button>
                </div>
              </>
            )}
            {view === "contact" && (
              <>
                <h3 className="chat-service-title">{t(bi("Let’s connect", "لنتواصل"))}</h3>
                <p className="chat-service-description">
                  {t(
                    bi(
                      "You can reach Baraa directly through email or professional profiles.",
                      "يمكنك التواصل مع براء مباشرة عبر البريد الإلكتروني أو حساباتها المهنية.",
                    ),
                  )}
                </p>
                <div className="chat-options">
                  <Button asChild variant="outline">
                    <a href={`mailto:${identity.email}`}>
                      {identity.email}
                      <Mail />
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={identity.linkedin} target="_blank" rel="noopener noreferrer">
                      LinkedIn — Baraa Abu Watfa
                      <ArrowRight />
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={identity.github} target="_blank" rel="noopener noreferrer">
                      GitHub — Baraa-abuwatfa
                      <ArrowRight />
                    </a>
                  </Button>
                </div>
              </>
            )}
            {view === "form" && (
              <form onSubmit={review} noValidate>
                <h3 className="chat-service-title">
                  {t(bi("Tell me about your project", "أخبرني عن مشروعك"))}
                </h3>
                <p className="assistant-text">
                  {t(
                    bi(
                      "Let’s start with your service and project details.",
                      "لنبدأ بالخدمة وتفاصيل المشروع.",
                    ),
                  )}
                </p>
                <div className="form-field">
                  <label htmlFor="inquiry-service">{label("service")} *</label>
                  <select
                    id="inquiry-service"
                    value={form.service}
                    required
                    aria-invalid={errors.includes("service")}
                    onChange={(event) => setForm({ ...form, service: event.target.value })}
                  >
                    <option value="">{t(bi("Choose a service", "اختر خدمة"))}</option>
                    {services.map((service, index) => (
                      <option value={index} key={index}>
                        {t(service.name)}
                      </option>
                    ))}
                  </select>
                </div>
                {(["title", "description", "timeline", "budget", "name", "email"] as const).map(
                  (field) => (
                    <div className="form-field" key={field}>
                      <label htmlFor={`inquiry-${field}`}>
                        {label(field)}{" "}
                        {["title", "description", "name", "email"].includes(field)
                          ? "*"
                          : t(bi("(optional)", "(اختياري)"))}
                      </label>
                      {field === "description" ? (
                        <textarea
                          id={`inquiry-${field}`}
                          value={form[field]}
                          maxLength={4000}
                          required
                          aria-invalid={errors.includes(field)}
                          onChange={(event) => setForm({ ...form, [field]: event.target.value })}
                          placeholder={t(
                            bi(
                              "What would you like to create or improve?",
                              "ما الذي تود إنشاءه أو تحسينه؟",
                            ),
                          )}
                        />
                      ) : (
                        <input
                          id={`inquiry-${field}`}
                          type={field === "email" ? "email" : "text"}
                          value={form[field]}
                          maxLength={field === "email" ? 254 : field === "name" ? 100 : 160}
                          required={["title", "name", "email"].includes(field)}
                          aria-invalid={errors.includes(field)}
                          onChange={(event) => setForm({ ...form, [field]: event.target.value })}
                          placeholder={field === "email" ? "you@example.com" : label(field)}
                        />
                      )}
                    </div>
                  ),
                )}
                <div className="honeypot" aria-hidden="true">
                  <label htmlFor="inquiry-website">Website</label>
                  <input
                    id="inquiry-website"
                    value={form.website}
                    onChange={(event) => setForm({ ...form, website: event.target.value })}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                {errors.length > 0 && (
                  <p className="form-error" role="alert">
                    {t(
                      bi(
                        "Please check these fields. Use a valid email, a title of at least 3 characters, and a description of at least 10 characters:",
                        "يرجى مراجعة هذه الحقول. استخدم بريدًا صالحًا وعنوانًا من 3 أحرف على الأقل ووصفًا من 10 أحرف على الأقل:",
                      ),
                    )}{" "}
                    {errors.map(label).join("، ")}
                  </p>
                )}
                <div className="chat-actions">
                  <Button type="submit">
                    {t(bi("Review Inquiry", "مراجعة الطلب"))}
                    <ArrowRight className="rtl-arrow" />
                  </Button>
                  <Button type="button" variant="ghost" onClick={() => setView("welcome")}>
                    {t(bi("Cancel", "إلغاء"))}
                  </Button>
                </div>
              </form>
            )}
            {view === "review" && (
              <>
                <h3 className="chat-service-title">
                  {t(bi("Review your inquiry", "مراجعة طلبك"))}
                </h3>
                <p className="assistant-text">
                  {t(
                    bi(
                      "Your inquiry will be sent to Baraa after you confirm.",
                      "سيُرسل طلبك إلى براء بعد تأكيدك.",
                    ),
                  )}
                </p>
                <dl className="review-list">
                  {(
                    [
                      "service",
                      "title",
                      "description",
                      "timeline",
                      "budget",
                      "name",
                      "email",
                    ] as const
                  ).map((field) => (
                    <div key={field}>
                      <dt>{label(field)}</dt>
                      <dd>
                        {field === "service"
                          ? t(
                              services[Number(form.service)]?.name ??
                                bi("Other Inquiry", "استفسار آخر"),
                            )
                          : form[field] || t(bi("Not specified", "غير محدد"))}
                      </dd>
                    </div>
                  ))}
                </dl>
                {failure && (
                  <div className="chat-status" role="alert">
                    {failure === "configuration"
                      ? t(
                          bi(
                            "Your request could not be sent: email sending is not configured yet. Your details are safe here. Please email Baraa directly, or retry after setup.",
                            "تعذر إرسال طلبك: لم يُعد إرسال البريد بعد. تفاصيلك محفوظة هنا. يرجى مراسلة براء مباشرة أو المحاولة بعد الإعداد.",
                          ),
                        )
                      : failure === "wait"
                        ? t(
                            bi(
                              "Please wait a few seconds before retrying.",
                              "يرجى الانتظار بضع ثوانٍ قبل المحاولة مجددًا.",
                            ),
                          )
                        : t(
                            bi(
                              "Your request could not be sent. Please retry. Your entered details have been preserved.",
                              "تعذر إرسال طلبك. يرجى المحاولة مجددًا. تم الاحتفاظ بالتفاصيل التي أدخلتها.",
                            ),
                          )}{" "}
                    <a className="text-link" href={`mailto:${identity.email}`}>
                      {t(bi("Email Baraa", "راسل براء"))}
                    </a>
                  </div>
                )}
                <div className="chat-actions">
                  <Button disabled={sending} onClick={send}>
                    {sending
                      ? t(bi("Sending…", "جارٍ الإرسال…"))
                      : t(bi("Confirm and Send", "تأكيد وإرسال"))}
                    <Send />
                  </Button>
                  <Button variant="outline" disabled={sending} onClick={() => setView("form")}>
                    {t(bi("Edit Details", "تعديل التفاصيل"))}
                  </Button>
                  <Button variant="ghost" disabled={sending} onClick={() => setView("welcome")}>
                    {t(bi("Cancel", "إلغاء"))}
                  </Button>
                </div>
              </>
            )}
            {view === "success" && (
              <>
                <Check className="text-primary" />
                <p className="assistant-text">
                  {t(
                    bi(
                      "Thank you! Your inquiry has been submitted successfully. Baraa will review your request.",
                      "شكرًا لك! تم إرسال طلبك بنجاح، وسيتمكن براء من مراجعة تفاصيله.",
                    ),
                  )}
                </p>
                <Button
                  onClick={() => {
                    setForm(initial);
                    submissionId.current = "";
                    setView("welcome");
                  }}
                >
                  {t(bi("Back to options", "العودة إلى الخيارات"))}
                </Button>
              </>
            )}
            {view !== "welcome" && view !== "form" && view !== "review" && view !== "success" && (
              <div className="chat-actions">
                <Button variant="ghost" onClick={() => setView("welcome")}>
                  <ChevronLeft className="rtl-arrow" />
                  {t(bi("Back", "رجوع"))}
                </Button>
              </div>
            )}
          </div>
        </section>
      )}
      <Button
        ref={launcher}
        className="chat-launcher"
        onClick={() => setOpen(!open)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={t(bi("Open Baraa’s Assistant", "فتح مساعد براء"))}
      >
        <img src={portrait.url} className="chat-avatar" alt="" />
        <span className="chat-indicator">
          <MessageCircle />
        </span>
      </Button>
    </>
  );
}
