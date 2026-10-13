export type Language = "en" | "ar";
export type Bilingual = { en: string; ar: string };
export const bi = (en: string, ar: string): Bilingual => ({ en, ar });
export const identity = {
  email: "abuwatfabaraa@gmail.com",
  linkedin:
    "https://www.linkedin.com/in/baraa-abuwatfa?utm_source=share&utm_campaign=share_via&utm_content=share_via&utm_medium=android_app",
  github: "https://github.com/baraa-abuwatfa",
};
export const categories = [
  bi("All Projects", "جميع المشاريع"),
  bi("Quality Assurance & Software Testing", "ضمان الجودة واختبار البرمجيات"),
  bi("AI & Automation", "الذكاء الاصطناعي والأتمتة"),
  bi("AI Creative Studio", "استوديو الإبداع بالذكاء الاصطناعي"),
];
export interface Project {
  id: string;
  title: Bilingual;
  shortTitle: Bilingual;
  category: number;
  description: Bilingual;
  cover: "kaya" | "lawyer" | "audit" | "workflow" | "creative";
  doc?: string;
  sections: { title: Bilingual; body: Bilingual }[];
}
const section = (en: string, ar: string, body: string, arabic: string) => ({
  title: bi(en, ar),
  body: bi(body, arabic),
});
export const projects: Project[] = [
  {
    id: "kaya-store-qa",
    title: bi("KAYA Store — E-commerce QA Testing", "متجر KAYA — اختبار جودة التجارة الإلكترونية"),
    shortTitle: bi("KAYA Store", "متجر KAYA"),
    category: 1,
    cover: "kaya",
    description: bi(
      "Structured testing and issue documentation for a skincare e-commerce experience.",
      "اختبارات منظمة وتوثيق الملاحظات لتجربة متجر إلكتروني لمنتجات العناية بالبشرة.",
    ),
    doc: "https://docs.google.com/spreadsheets/d/1XJ1hyKiaE4whCvYa_qDbmgy9qJkfYeRugdgEyer68UU/edit?usp=drivesdk",
    sections: [
      section(
        "Project Overview",
        "نظرة عامة",
        "A quality assurance project for KAYA, an e-commerce store specializing in skincare products. The focus is evaluating store behavior and maintaining organized testing documentation.",
        "مشروع ضمان جودة لمتجر KAYA المتخصص بمنتجات العناية بالبشرة، يركز على تقييم سلوك المتجر وتنظيم توثيق الاختبارات.",
      ),
      section(
        "Project Objectives",
        "أهداف المشروع",
        "Review customer-facing behavior, identify issues, and record clear observations that support follow-up and improvement.",
        "مراجعة سلوك المتجر أمام العملاء، وتحديد المشكلات، وتوثيق ملاحظات واضحة لدعم المتابعة والتحسين.",
      ),
      section(
        "Testing Scope",
        "نطاق الاختبار",
        "The accessible issue sheet records website and backend observations, including purchase-button behavior. The original workbook remains the reference for the full scope.",
        "تتضمن ورقة المشكلات المتاحة ملاحظات على الموقع والواجهة الخلفية، بما فيها سلوك زر الشراء. يبقى الملف الأصلي مرجعًا للنطاق الكامل.",
      ),
      section(
        "Test Scenarios and Test Cases",
        "سيناريوهات وحالات الاختبار",
        "Testing activities are organized around store behavior. The verified issue sheet is not a complete test-case inventory; consult the original workbook for individual scenarios and cases.",
        "تُنظم أنشطة الاختبار حول سلوك المتجر. ورقة المشكلات التي تمت مراجعتها ليست قائمة كاملة بحالات الاختبار؛ راجع الملف الأصلي للسيناريوهات والحالات الفردية.",
      ),
      section(
        "Test Execution and Recorded Results",
        "التنفيذ والنتائج المسجلة",
        "Issue status and expected/actual results are recorded in the source sheet. No aggregate pass rate or execution total is claimed here.",
        "تُسجل حالة المشكلة والنتائج المتوقعة والفعلية في الورقة الأصلية. لا تُعرض هنا نسب نجاح أو إجماليات تنفيذ غير مؤكدة.",
      ),
      section(
        "Documented Defects or Observations",
        "المشكلات والملاحظات الموثقة",
        "The source includes purchase-button functionality observations. Issue records include number, date, type, user type, build, priority, status, title, action, and expected/actual result.",
        "يتضمن المصدر ملاحظات على وظائف زر الشراء. تشمل السجلات رقم المشكلة وتاريخها ونوعها ونوع المستخدم والإصدار والأولوية والحالة والعنوان والإجراء والنتيجة المتوقعة والفعلية.",
      ),
      section(
        "Testing Documentation",
        "توثيق الاختبار",
        "The original spreadsheet contains structured issue tracking. Its status and priority fields help organize review and follow-up.",
        "يحتوي الجدول الأصلي على تتبع منظم للمشكلات، وتساعد حقول الحالة والأولوية على تنظيم المراجعة والمتابعة.",
      ),
      section(
        "Key Learnings",
        "أبرز ما تعلمته",
        "A practical focus on clear issue descriptions, expected-versus-actual behavior, and consistent records that make testing easier to review.",
        "تركيز عملي على وصف المشكلات بوضوح، ومقارنة السلوك المتوقع والفعلي، وتوحيد السجلات لتسهيل مراجعة الاختبارات.",
      ),
    ],
  },
  {
    id: "lawyer-application-qa",
    title: bi(
      "Lawyer Application — Test Cases & Execution Analysis",
      "تطبيق المحامين — حالات الاختبار وتحليل التنفيذ",
    ),
    shortTitle: bi("Lawyer Application", "تطبيق المحامين"),
    category: 1,
    cover: "lawyer",
    description: bi(
      "Test scenarios, execution statuses, and structured analysis for a lawyer application.",
      "سيناريوهات الاختبار وحالات التنفيذ والتحليل المنظم لتطبيق المحامين.",
    ),
    doc: "https://docs.google.com/spreadsheets/d/1FXW2QwSdIu88POlhgySwgmJ0HkSAKsePk2gGunRgK2s/edit?usp=drivesdk",
    sections: [
      section(
        "Project Overview",
        "نظرة عامة",
        "A software testing project reviewing a lawyer application through structured scenarios, documented test cases, and execution analysis.",
        "مشروع اختبار برمجيات لمراجعة تطبيق المحامين باستخدام سيناريوهات منظمة وحالات اختبار موثقة وتحليل التنفيذ.",
      ),
      section(
        "Testing Objectives",
        "أهداف الاختبار",
        "Review account flows and service-provider browsing, and maintain useful execution and development status records.",
        "مراجعة تدفقات الحساب وتصفح مقدمي الخدمات، والحفاظ على سجلات مفيدة لحالة التنفيذ والتطوير.",
      ),
      section(
        "Testing Scope",
        "نطاق الاختبار",
        "The accessible sheet documents mobile testing on a Redmi Note 11s running Android 13. It includes account creation, login, and browsing lawyers and notaries.",
        "توثق الورقة المتاحة اختبارات الهاتف على Redmi Note 11s بنظام Android 13، وتشمل إنشاء الحساب وتسجيل الدخول وتصفح المحامين وكتّاب العدل.",
      ),
      section(
        "Test Scenarios",
        "سيناريوهات الاختبار",
        "Verified scenarios cover account creation, verified and unverified login, and browsing service providers. Full scenario wording is available in the source.",
        "تشمل السيناريوهات المؤكدة إنشاء الحساب وتسجيل الدخول للحسابات الموثقة وغير الموثقة وتصفح مقدمي الخدمات. تفاصيلها الكاملة متاحة في المصدر.",
      ),
      section(
        "Detailed Test Cases",
        "حالات الاختبار التفصيلية",
        "The source organizes environment, modules, scenarios, branch, priority, scenario working status, and developer status.",
        "ينظم المصدر بيئة الاختبار والوحدات والسيناريوهات والفرع والأولوية وحالة عمل السيناريو وحالة المطور.",
      ),
      section(
        "Test Execution Status",
        "حالة تنفيذ الاختبار",
        "Scenario working status and developer status are recorded separately. This page does not replace or reinterpret individual execution records.",
        "تُسجل حالة عمل السيناريو وحالة المطور بشكل منفصل، ولا تستبدل هذه الصفحة سجلات التنفيذ الفردية أو تعيد تفسيرها.",
      ),
      section(
        "Executed vs. Unexecuted Test Analysis",
        "تحليل المنفذ وغير المنفذ",
        "The workbook is the reference for execution analysis. Verified aggregate counts are not available here, so no chart or completion percentage is shown.",
        "الملف الأصلي هو مرجع تحليل التنفيذ. لا تتوفر هنا إجماليات مؤكدة، لذلك لا يُعرض مخطط أو نسبة إنجاز.",
      ),
      section(
        "Recorded Errors",
        "الأخطاء المسجلة",
        "Refer to the original scenario status records for observed errors. No unverified defect list or error total is reproduced.",
        "راجع سجلات حالة السيناريوهات الأصلية للأخطاء الملحوظة. لا تُعرض قائمة عيوب أو إجماليات غير مؤكدة.",
      ),
      section(
        "Testing Summary",
        "ملخص الاختبار",
        "The documented work connects mobile scenarios, priorities, and status tracking for organized application review.",
        "يربط العمل الموثق بين سيناريوهات الهاتف والأولويات وتتبع الحالة لمراجعة منظمة للتطبيق.",
      ),
      section(
        "Key Learnings",
        "أبرز ما تعلمته",
        "Clear scenario organization and separate status fields support more precise testing follow-up and communication.",
        "يساعد تنظيم السيناريوهات وحقول الحالة المنفصلة على متابعة الاختبارات والتواصل بدقة أكبر.",
      ),
    ],
  },
  {
    id: "gaza-sky-geeks-qa",
    title: bi(
      "Website QA Audit — Test Cases, Bug Reports & Readiness Analysis",
      "تدقيق جودة الموقع — حالات الاختبار وتقارير الأخطاء وتحليل الجاهزية",
    ),
    shortTitle: bi("Website QA Audit", "تدقيق جودة الموقع"),
    category: 1,
    cover: "audit",
    description: bi(
      "Practical test documentation and progress analysis from QA training at Gaza Sky Geeks.",
      "توثيق عملي للاختبارات وتحليل التقدم خلال تدريب ضمان الجودة في Gaza Sky Geeks.",
    ),
    doc: "https://docs.google.com/spreadsheets/d/1uGvIMjOhHotkWHUXd7egn2IBwFm2RWuNtpDNucDDQZE/edit?usp=drivesdk",
    sections: [
      section(
        "Project Overview",
        "نظرة عامة",
        "A practical website QA project associated with training at Gaza Sky Geeks, focusing on organized test cases and testing progress.",
        "مشروع عملي لاختبار جودة المواقع مرتبط بتدريب Gaza Sky Geeks، يركز على تنظيم حالات الاختبار وتقدم العمل.",
      ),
      section(
        "Training Context",
        "سياق التدريب",
        "Completed in the context of QA training at Gaza Sky Geeks, Gaza, November 2022–February 2023.",
        "ضمن سياق تدريب ضمان الجودة في Gaza Sky Geeks بغزة، من نوفمبر 2022 إلى فبراير 2023.",
      ),
      section(
        "Testing Objectives",
        "أهداف الاختبار",
        "Review website behavior, document testing tasks, track results, and support analysis of progress and readiness.",
        "مراجعة سلوك الموقع وتوثيق مهام الاختبار وتتبع النتائج ودعم تحليل التقدم والجاهزية.",
      ),
      section(
        "Test Case Management",
        "إدارة حالات الاختبار",
        "The accessible sheet documents the Famcare main page. Fields include modules, scenarios, ID, environment, title, priority, type, and status.",
        "توثق الورقة المتاحة الصفحة الرئيسية لموقع Famcare. تشمل الحقول الوحدات والسيناريوهات والمعرّف والبيئة والعنوان والأولوية والنوع والحالة.",
      ),
      section(
        "Completed-Work Analysis",
        "تحليل العمل المكتمل",
        "Status records support reviewing testing progress. No completion totals or percentages are asserted without a verified aggregate.",
        "تدعم سجلات الحالة مراجعة تقدم الاختبار، ولا تُعرض إجماليات أو نسب إنجاز دون بيانات إجمالية مؤكدة.",
      ),
      section(
        "Bug Reporting",
        "تقارير الأخطاء",
        "Bug-report preparation is part of the project context. Steps to reproduce, expected and actual results, severity, and evidence are general QA practices, not confirmed fields in this accessible sheet.",
        "إعداد تقارير الأخطاء جزء من سياق المشروع. خطوات إعادة المشكلة والنتائج المتوقعة والفعلية والشدة والأدلة هي ممارسات عامة لضمان الجودة، وليست حقولًا مؤكدة في الورقة المتاحة.",
      ),
      section(
        "Test Execution and Results",
        "تنفيذ الاختبارات والنتائج",
        "Verified cases review navigation to Specialists, Blog, Academy, and About Us on Chrome with Windows 10. Individual statuses remain in the source.",
        "تراجع الحالات المؤكدة التنقل إلى المختصين والمدونة والأكاديمية ومن نحن على Chrome وWindows 10. تبقى الحالات الفردية في المصدر.",
      ),
      section(
        "Implementation Progress and Readiness Analysis",
        "تحليل تقدم التنفيذ والجاهزية",
        "The project context includes progress and readiness review. No readiness score or unsupported chart is presented.",
        "يشمل سياق المشروع مراجعة التقدم والجاهزية. لا تُعرض درجة جاهزية أو مخططات غير مدعومة.",
      ),
      section(
        "QA Skills Demonstrated",
        "مهارات ضمان الجودة",
        "Structured test design, manual website testing, test documentation, priority organization, and result tracking are supported by the accessible records.",
        "تدعم السجلات المتاحة تصميم الاختبارات المنظم والاختبار اليدوي للمواقع وتوثيق الاختبارات وتنظيم الأولويات وتتبع النتائج.",
      ),
      section(
        "Lessons Learned",
        "الدروس المستفادة",
        "Consistent test-case fields and environment information make testing records clearer and easier to revisit.",
        "تجعل حقول حالات الاختبار الموحدة ومعلومات البيئة السجلات أوضح وأسهل للمراجعة.",
      ),
    ],
  },
  {
    id: "task-delay-alert-system",
    title: bi("Task Delay Alert System", "نظام التنبيه بتأخر المهام"),
    shortTitle: bi("Task Delay Alert System", "نظام التنبيه بتأخر المهام"),
    category: 2,
    cover: "workflow",
    description: bi(
      "A workflow concept for detecting overdue tasks and supporting timely email follow-up.",
      "تصور لسير عمل يكتشف المهام المتأخرة ويدعم المتابعة عبر البريد الإلكتروني.",
    ),
    sections: [
      section(
        "Project Overview",
        "نظرة عامة",
        "A workflow automation project developed in the context of training with Freelancing Incubator, Women’s Affairs Center. It addresses task delivery delays across departments.",
        "مشروع لأتمتة سير العمل ضمن تدريب حاضنة العمل الحر في مركز شؤون المرأة، يعالج تأخر تسليم المهام بين الأقسام.",
      ),
      section(
        "Business Problem",
        "المشكلة",
        "Manual follow-up can delay awareness of overdue tasks, contribute to missed deadlines, and make coordination less efficient.",
        "قد تؤخر المتابعة اليدوية اكتشاف المهام المتأخرة، وتسبب تفويت المواعيد، وتقلل كفاءة التنسيق.",
      ),
      section(
        "Objectives",
        "الأهداف",
        "Monitor task information, detect overdue tasks according to configured conditions, and send email alerts to support timely follow-up.",
        "مراقبة معلومات المهام واكتشاف المتأخر منها وفق شروط محددة وإرسال تنبيهات بريدية لدعم المتابعة في الوقت المناسب.",
      ),
      section(
        "Proposed Workflow",
        "سير العمل المقترح",
        "Read task records, check their status and deadline, evaluate delay conditions, identify overdue work, and notify the appropriate recipient for follow-up. The diagram below is a workflow illustration, not a screenshot of a deployed system.",
        "قراءة سجلات المهام وفحص الحالة والموعد النهائي وتقييم شروط التأخير وتحديد العمل المتأخر وإشعار المستلم المناسب. الرسم أدناه توضيح لسير العمل، وليس صورة لنظام منشور.",
      ),
      section(
        "Task Data and Inputs",
        "بيانات المهام والمدخلات",
        "Configurable inputs may include task title, department, assigned person, deadline, status, and notification recipient. These are possible fields, not a claim that every field is implemented.",
        "قد تشمل المدخلات القابلة للإعداد عنوان المهمة والقسم والمسؤول والموعد والحالة ومستلم الإشعار. هذه حقول محتملة، وليست ادعاءً بتنفيذها جميعًا.",
      ),
      section(
        "Delay Detection Logic",
        "منطق اكتشاف التأخير",
        "Conceptually, compare the deadline with the current time and check that the task is not complete. Exact status values, time zones, and business rules must be configured for the workflow.",
        "من حيث التصور، يُقارن الموعد النهائي بالوقت الحالي مع التأكد أن المهمة غير مكتملة. تحتاج قيم الحالة والمنطقة الزمنية وقواعد العمل إلى إعداد.",
      ),
      section(
        "Conditions and Exceptions",
        "الشروط والاستثناءات",
        "Possible rules include excluding completed or cancelled tasks, handling missing deadlines, and avoiding repeated notifications. These are configuration considerations, not verified implementation claims.",
        "قد تشمل القواعد استبعاد المهام المكتملة أو الملغاة ومعالجة المواعيد المفقودة وتجنب تكرار الإشعارات. هذه اعتبارات إعداد وليست وظائف مؤكدة التنفيذ.",
      ),
      section(
        "Email Alert Mechanism",
        "آلية تنبيه البريد الإلكتروني",
        "The proposed alert provides the task context to a configured recipient. A provider, sender, and recipient configuration would be needed for actual delivery.",
        "يقدم التنبيه المقترح سياق المهمة إلى مستلم محدد. يتطلب الإرسال الفعلي إعداد مزود البريد والمرسل والمستلم.",
      ),
      section(
        "Department Coordination",
        "التنسيق بين الأقسام",
        "Designed around follow-up across Software Development, Quality Assurance, and Design departments.",
        "يركز التصور على المتابعة بين أقسام تطوير البرمجيات وضمان الجودة والتصميم.",
      ),
      section(
        "Lessons Learned",
        "الدروس المستفادة",
        "Clear conditions and well-organized inputs are essential to a useful automation workflow. Production deployment and end-to-end validation are not confirmed.",
        "الشروط الواضحة والمدخلات المنظمة ضرورية لسير عمل مفيد. لا يوجد تأكيد للنشر الإنتاجي أو الاختبار الشامل.",
      ),
    ],
  },
  {
    id: "ai-creative-studio",
    title: bi(
      "AI-Powered Visuals, Video & Advertising",
      "مرئيات وفيديو وإعلانات بمساعدة الذكاء الاصطناعي",
    ),
    shortTitle: bi("AI Creative Studio", "استوديو الإبداع بالذكاء الاصطناعي"),
    category: 3,
    cover: "creative",
    description: bi(
      "Creative direction, prompt engineering, and AI-assisted visual storytelling.",
      "توجيه إبداعي وهندسة أوامر وسرد بصري بمساعدة الذكاء الاصطناعي.",
    ),
    sections: [
      section(
        "Project Overview",
        "نظرة عامة",
        "A collection focused on AI-assisted visual content, video concepts, advertising, and digital storytelling. Actual creative media will be added as it becomes available.",
        "مجموعة تركز على المحتوى البصري بمساعدة الذكاء الاصطناعي وأفكار الفيديو والإعلانات والسرد الرقمي. ستُضاف الأعمال الفعلية عندما تتوفر.",
      ),
      section(
        "Creative Approach",
        "النهج الإبداعي",
        "Exploring creative direction, prompt engineering, visual experimentation, and AI-assisted multimedia production. No fictional client work or unprovided final outputs are presented.",
        "استكشاف التوجيه الإبداعي وهندسة الأوامر والتجريب البصري وإنتاج الوسائط بمساعدة الذكاء الاصطناعي. لا تُعرض أعمال عملاء خيالية أو مخرجات نهائية غير مقدمة.",
      ),
    ],
  },
];
export const services = [
  {
    name: bi("Workflow Automation", "أتمتة سير العمل"),
    description: bi(
      "Organizing repetitive tasks and designing workflows to improve follow-up, efficiency, and coordination.",
      "تنظيم المهام المتكررة وتصميم سير عمل لتحسين المتابعة والكفاءة والتنسيق.",
    ),
  },
  {
    name: bi("AI Image Creation", "إنشاء الصور باستخدام الذكاء الاصطناعي"),
    description: bi(
      "Creating AI-assisted visual concepts and image content based on creative direction and prompts.",
      "إنشاء أفكار بصرية ومحتوى صور بمساعدة الذكاء الاصطناعي وفق توجيه إبداعي وأوامر.",
    ),
  },
  {
    name: bi("AI Video Creation", "إنشاء الفيديوهات باستخدام الذكاء الاصطناعي"),
    description: bi(
      "Developing AI-assisted video concepts, scenes, and visual storytelling.",
      "تطوير أفكار فيديو ومشاهد وسرد بصري بمساعدة الذكاء الاصطناعي.",
    ),
  },
  {
    name: bi("AI Advertising Content", "إنشاء المحتوى الإعلاني باستخدام الذكاء الاصطناعي"),
    description: bi(
      "Developing creative advertising concepts and promotional content for brands and products.",
      "تطوير أفكار إعلانية إبداعية ومحتوى ترويجي للعلامات التجارية والمنتجات.",
    ),
  },
  {
    name: bi("AI-Assisted Website Creation", "إنشاء المواقع بمساعدة الذكاء الاصطناعي"),
    description: bi(
      "Supporting website planning and creation with AI-assisted workflows.",
      "دعم تخطيط المواقع وإنشائها عبر سير عمل بمساعدة الذكاء الاصطناعي.",
    ),
  },
  {
    name: bi("QA & Software Testing", "ضمان الجودة واختبار البرمجيات"),
    description: bi(
      "Preparing test cases, testing web applications, documenting bugs, and organizing QA activities.",
      "إعداد حالات الاختبار واختبار تطبيقات الويب وتوثيق الأخطاء وتنظيم أنشطة ضمان الجودة.",
    ),
  },
  {
    name: bi("Other Inquiry", "استفسار آخر"),
    description: bi(
      "Tell Baraa about another request or opportunity.",
      "أخبر براء عن طلب أو فرصة أخرى.",
    ),
  },
];
export const skillGroups = [
  {
    title: bi("QA & Software Testing", "ضمان الجودة واختبار البرمجيات"),
    description: bi(
      "Thoughtful testing. Clear documentation. More reliable software.",
      "اختبارات مدروسة وتوثيق واضح وبرمجيات أكثر موثوقية.",
    ),
    categories: [
      bi("QA & Software Testing", "ضمان الجودة واختبار البرمجيات"),
      bi("Performance Testing", "اختبار الأداء"),
      bi("Test Cases & Bug Reporting", "حالات الاختبار وتقارير الأخطاء"),
    ],
    skills: [
      bi("Functional Testing", "الاختبار الوظيفي"),
      bi("Web Application Testing", "اختبار تطبيقات الويب"),
      bi("Mobile Application Testing", "اختبار تطبيقات الهاتف"),
      bi("Test Case Design & Preparation", "تصميم وإعداد حالات الاختبار"),
      bi("Bug Identification & Reporting", "تحديد الأخطاء والإبلاغ عنها"),
      bi("Bug Reproduction & Documentation", "إعادة الأخطاء وتوثيقها"),
      bi("Test Execution & Result Documentation", "تنفيذ الاختبار وتوثيق النتائج"),
      bi("Issue Tracking & Follow-up", "تتبع المشكلات ومتابعتها"),
      bi("Test Documentation & Reports", "توثيق الاختبارات والتقارير"),
      bi("Quality Assurance", "ضمان الجودة"),
      bi("Performance Testing Concepts", "مفاهيم اختبار الأداء"),
      bi("Load & Stress Testing Concepts", "مفاهيم اختبار الحمل والضغط"),
    ],
    note: bi(
      "Performance, load, and stress testing are presented as learning concepts, not advanced production expertise.",
      "تُعرض اختبارات الأداء والحمل والضغط كمفاهيم تعلم، وليس كخبرة إنتاجية متقدمة.",
    ),
  },
  {
    title: bi("AI & Automation", "الذكاء الاصطناعي والأتمتة"),
    description: bi(
      "Practical AI, creative thinking, and workflows with purpose.",
      "ذكاء اصطناعي عملي وتفكير إبداعي وسير عمل هادف.",
    ),
    categories: [
      bi("AI & Prompt Engineering", "الذكاء الاصطناعي وهندسة الأوامر"),
      bi("Workflow Automation", "أتمتة سير العمل"),
    ],
    skills: [
      bi("AI & Workflow Automation", "الذكاء الاصطناعي وأتمتة سير العمل"),
      bi("Prompt Engineering", "هندسة الأوامر"),
      bi("AI-Assisted Data Analysis", "تحليل البيانات بمساعدة الذكاء الاصطناعي"),
      bi("AI Information Extraction", "استخراج المعلومات بالذكاء الاصطناعي"),
      bi("AI Data Classification", "تصنيف البيانات بالذكاء الاصطناعي"),
      bi("AI Output Verification", "التحقق من مخرجات الذكاء الاصطناعي"),
      bi("AI-Assisted Research", "البحث بمساعدة الذكاء الاصطناعي"),
      bi("AI-Assisted Report Generation", "إعداد التقارير بمساعدة الذكاء الاصطناعي"),
      bi("Workflow Monitoring", "مراقبة سير العمل"),
      bi("Process Improvement", "تحسين العمليات"),
      bi("AI-Assisted Image Creation", "إنشاء الصور بمساعدة الذكاء الاصطناعي"),
      bi("AI-Assisted Video Creation", "إنشاء الفيديو بمساعدة الذكاء الاصطناعي"),
      bi("AI Advertising Content", "المحتوى الإعلاني بالذكاء الاصطناعي"),
    ],
    note: bi(
      "Practical capabilities and project interests—not claims of advanced model development.",
      "قدرات عملية واهتمامات بالمشاريع، وليست ادعاءات بتطوير نماذج متقدمة.",
    ),
  },
  {
    title: bi("System Analysis & Documentation", "تحليل الأنظمة والتوثيق"),
    description: bi(
      "Turning complex requirements into organized, actionable information.",
      "تحويل المتطلبات المعقدة إلى معلومات منظمة وقابلة للتنفيذ.",
    ),
    categories: [bi("Technical Documentation", "التوثيق التقني")],
    skills: [
      bi("Requirements Analysis", "تحليل المتطلبات"),
      bi("System Process Documentation", "توثيق عمليات الأنظمة"),
      bi("Workflow Analysis", "تحليل سير العمل"),
      bi("Technical Documentation", "التوثيق التقني"),
      bi("Reporting & Data Organization", "التقارير وتنظيم البيانات"),
      bi("Issue Follow-up", "متابعة المشكلات"),
      bi("Cross-Team Coordination", "التنسيق بين الفرق"),
      bi("Process Improvement", "تحسين العمليات"),
    ],
  },
  {
    title: bi("Software Engineering & Front-End Fundamentals", "هندسة البرمجيات وأساسيات الواجهات"),
    description: bi(
      "A foundation in software thinking and the essentials of the web.",
      "أساس في التفكير البرمجي ومبادئ تطوير الويب.",
    ),
    categories: [bi("Software Engineering", "هندسة البرمجيات")],
    skills: [
      bi("Software Engineering Fundamentals", "أساسيات هندسة البرمجيات"),
      bi("HTML", "HTML"),
      bi("CSS", "CSS"),
      bi("Front-End Development Fundamentals", "أساسيات تطوير الواجهات الأمامية"),
    ],
  },
];
