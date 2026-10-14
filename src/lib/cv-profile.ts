import { bi, type Bilingual as Bi } from "@/lib/portfolio-data";

/** Structured facts taken only from Baraa's uploaded CV. Questions are derived from this data. */
type Entry = { title: Bi; org: Bi; period: string; kind: "work" | "training"; points: Bi[] };

const experience: Entry[] = [
  {
    title: bi("Quality Assurance Engineer & System Analyst", "مهندسة ضمان جودة ومحللة أنظمة"),
    org: bi("Devun Company, Gaza", "شركة Devun، غزة"),
    period: "May 2023 – Sep 2024",
    kind: "work",
    points: [
      bi(
        "Tested web and mobile applications and documented results",
        "اختبار تطبيقات الويب والجوال وتوثيق النتائج",
      ),
      bi(
        "Analyzed system requirements and ensured compliance with specifications",
        "تحليل متطلبات النظام والتأكد من مطابقتها للمواصفات",
      ),
      bi("Prepared documentation and reports", "إعداد التوثيق والتقارير"),
      bi("Tracked issues and ensured proper resolution", "تتبع المشكلات والتأكد من حلها"),
      bi("Collaborated with development teams", "التعاون مع فرق التطوير"),
    ],
  },
  {
    title: bi("Quality Assurance Trainee", "متدربة ضمان جودة"),
    org: bi("Gaza Sky Geeks, Gaza", "Gaza Sky Geeks، غزة"),
    period: "Nov 2022 – Feb 2023",
    kind: "training",
    points: [
      bi("Performed manual testing for web applications", "تنفيذ الاختبار اليدوي لتطبيقات الويب"),
      bi("Created test cases and documented results", "كتابة حالات الاختبار وتوثيق النتائج"),
      bi("Reported software issues", "الإبلاغ عن مشكلات البرمجيات"),
    ],
  },
  {
    title: bi("Front-End Developer Trainee", "متدربة تطوير واجهات أمامية"),
    org: bi("Gaza Municipality, Gaza", "بلدية غزة"),
    period: "Jul 2022 – Aug 2022",
    kind: "training",
    points: [
      bi("Participated in web-based projects", "المشاركة في مشاريع ويب"),
      bi("Supported documentation", "دعم التوثيق"),
      bi("Collaborated with teams", "التعاون مع الفرق"),
    ],
  },
];

const list = (items: string[]) => items.map((i) => `• ${i}`).join("\n");

type Topic = { question: Bi; answer: Bi; keywords: RegExp };

function build(): Topic[] {
  const topics: Topic[] = [
    {
      question: bi("What is Baraa's professional summary?", "ما هي النبذة المهنية لبراء؟"),
      answer: bi(
        "Baraa is a detail-oriented Computer Systems Engineer with experience in quality assurance, data analysis, and system documentation — skilled in data collection, reporting, process monitoring, and ensuring data accuracy, and experienced in working with technical teams and documenting requirements.",
        "براء مهندسة أنظمة حاسوب دقيقة في التفاصيل، لديها خبرة في ضمان الجودة وتحليل البيانات وتوثيق الأنظمة، وتتقن جمع البيانات وإعداد التقارير ومتابعة العمليات وضمان دقة البيانات، ولديها خبرة في العمل مع الفرق التقنية وتوثيق المتطلبات.",
      ),
      keywords: /summary|who|profile|about|نبذة|من هي|ملخص|تعريف/,
    },
  ];
  for (const e of experience) {
    const work = e.kind === "work";
    topics.push({
      question: work
        ? bi(
            `What did Baraa do as ${e.title.en} at ${e.org.en}?`,
            `ما مهام براء كـ${e.title.ar} في ${e.org.ar}؟`,
          )
        : bi(
            `What did Baraa learn as ${e.title.en} at ${e.org.en}?`,
            `ماذا تعلمت براء كـ${e.title.ar} في ${e.org.ar}؟`,
          ),
      answer: bi(
        `${work ? "Professional experience" : "Training"} — ${e.title.en}, ${e.org.en} (${e.period}):\n${list(e.points.map((p) => p.en))}`,
        `${work ? "خبرة مهنية" : "تدريب"} — ${e.title.ar}، ${e.org.ar} (${e.period}):\n${list(e.points.map((p) => p.ar))}`,
      ),
      keywords: new RegExp(
        (e.org.en.split(",")[0] ?? "").toLowerCase() +
          (work
            ? "|experience|job|work|system analyst|خبرة|عمل|وظيف"
            : e.title.en.includes("Front")
              ? "|front|municipality|بلدية|واجه"
              : "|sky|trainee|training|تدريب|متدرب"),
      ),
    });
  }
  topics.push(
    {
      question: bi("What is Baraa's educational background?", "ما هو المؤهل العلمي لبراء؟"),
      answer: bi(
        "Education: Bachelor of Computer Systems Engineering — Al-Azhar University, Gaza (2018 – 2023).",
        "التعليم: بكالوريوس هندسة أنظمة الحاسوب — جامعة الأزهر، غزة (2018 – 2023).",
      ),
      keywords: /educat|degree|university|bachelor|study|تعليم|جامع|شهادة جامعية|بكالوريوس|دراس/,
    },
    {
      question: bi(
        "Which technical tools and languages does Baraa use?",
        "ما الأدوات واللغات التقنية التي تستخدمها براء؟",
      ),
      answer: bi(
        `Technical skills listed in the CV:\n${list(["HTML, CSS, Java, JavaScript, PHP", "Selenium, Jira, Trello", "GitHub and GitHub Actions", "Microsoft Office (Excel, Word)"])}`,
        `المهارات التقنية الواردة في السيرة الذاتية:\n${list(["HTML, CSS, Java, JavaScript, PHP", "Selenium, Jira, Trello", "GitHub و GitHub Actions", "Microsoft Office (Excel, Word)"])}`,
      ),
      keywords:
        /tech|tool|selenium|jira|trello|github|java|html|css|php|program|code|أدوات|تقني|برمج|لغات برمجة/,
    },
    {
      question: bi(
        "What QA and testing skills does Baraa have?",
        "ما مهارات ضمان الجودة والاختبار لدى براء؟",
      ),
      answer: bi(
        `From the CV: testing web and mobile applications, manual testing, creating test cases, documenting results, reporting software issues, tracking issues to resolution, analyzing requirements against specifications, attention to detail and quality assurance, an understanding of SDLC and Agile, and the tools Selenium and Jira.`,
        `بحسب السيرة الذاتية: اختبار تطبيقات الويب والجوال، الاختبار اليدوي، كتابة حالات الاختبار، توثيق النتائج، الإبلاغ عن المشكلات وتتبعها حتى الحل، تحليل المتطلبات مقابل المواصفات، الدقة وضمان الجودة، فهم SDLC وAgile، وأدوات Selenium وJira.`,
      ),
      keywords: /qa|quality|test|bug|manual|agile|sdlc|جودة|اختبار|أخطاء|خلل/,
    },
    {
      question: bi(
        "What data and reporting skills does Baraa have?",
        "ما مهارات البيانات والتقارير لدى براء؟",
      ),
      answer: bi(
        `Key skills in the CV:\n${list(["Data Collection and Data Verification", "Monitoring and Reporting Support", "Data Analysis and Documentation", "Microsoft Excel and Word"])}`,
        `المهارات الأساسية في السيرة الذاتية:\n${list(["جمع البيانات والتحقق منها", "دعم المتابعة وإعداد التقارير", "تحليل البيانات والتوثيق", "Microsoft Excel و Word"])}`,
      ),
      keywords:
        /data|report|excel|word|monitor|analy|document|بيانات|تقرير|تقارير|تحليل|توثيق|إكسل/,
    },
    {
      question: bi(
        "What volunteering experience does Baraa have?",
        "ما خبرة براء في العمل التطوعي؟",
      ),
      answer: bi(
        `Volunteering — Social Development Volunteer, Field Research & Data Collection (2025):\n${list(["Conducted field data collection through surveys and community engagement", "Performed data entry using specialized data tools", "Verified and cleaned data to ensure accuracy", "Supported reporting and data organization", "Collaborated with team members to achieve project goals"])}`,
        `تطوع — متطوعة في التنمية الاجتماعية، البحث الميداني وجمع البيانات (2025):\n${list(["جمع البيانات ميدانيًا عبر الاستبيانات والتواصل المجتمعي", "إدخال البيانات باستخدام أدوات متخصصة", "التحقق من البيانات وتنقيحها لضمان دقتها", "دعم التقارير وتنظيم البيانات", "التعاون مع أعضاء الفريق لتحقيق أهداف المشروع"])}`,
      ),
      keywords: /volunt|field|survey|community|تطوع|ميدان|استبيان|مجتمع/,
    },
    {
      question: bi(
        "Which certificates and courses has Baraa completed?",
        "ما الشهادات والدورات التي أنجزتها براء؟",
      ),
      answer: bi(
        `Certificates:\n${list(["Software Quality Assurance — Gaza Sky Geeks", "Manual Testing Courses — QAcart", "Front-End Development Courses — Udemy"])}`,
        `الشهادات:\n${list(["ضمان جودة البرمجيات — Gaza Sky Geeks", "دورات الاختبار اليدوي — QAcart", "دورات تطوير الواجهات الأمامية — Udemy"])}`,
      ),
      keywords: /certif|course|qacart|udemy|qualif|شهاد|دور|مؤهل/,
    },
    {
      question: bi("What languages does Baraa speak?", "ما اللغات التي تتحدثها براء؟"),
      answer: bi(
        "Languages: Arabic — native; English — professional working proficiency in writing and conversation.",
        "اللغات: العربية — اللغة الأم؛ الإنجليزية — مستوى عمل مهني في الكتابة والمحادثة.",
      ),
      keywords: /language|english|arabic|speak|لغة|لغات|إنجليزي|عربي/,
    },
    {
      question: bi(
        "What soft skills does Baraa bring to a team?",
        "ما المهارات الشخصية التي تقدمها براء للفريق؟",
      ),
      answer: bi(
        `From the CV:\n${list(["Problem Solving and Analytical Thinking", "Communication and Teamwork", "Attention to Detail", "Collaborating with development and technical teams"])}`,
        `بحسب السيرة الذاتية:\n${list(["حل المشكلات والتفكير التحليلي", "التواصل والعمل الجماعي", "الدقة والاهتمام بالتفاصيل", "التعاون مع فرق التطوير والفرق التقنية"])}`,
      ),
      keywords: /soft|team|communicat|problem|analytical|شخصي|فريق|تواصل|مشكلات/,
    },
  );
  return topics;
}

export const cvTopics = build();

export const cvMissing = bi(
  "That information is not available in Baraa’s current portfolio information. Try one of the suggested questions, or contact Baraa directly.",
  "هذه المعلومة غير متوفرة في معلومات براء الحالية. جرّب أحد الأسئلة المقترحة أو تواصل مع براء مباشرة.",
);

export function answerCvQuestion(input: string): Topic | null {
  const q = input.toLowerCase();
  let best: Topic | null = null;
  let score = 0;
  for (const topic of cvTopics) {
    const matches = q.match(new RegExp(topic.keywords.source, "g"))?.length ?? 0;
    if (matches > score) {
      score = matches;
      best = topic;
    }
  }
  return best;
}
