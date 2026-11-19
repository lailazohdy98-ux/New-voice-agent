// ─────────────────────────────────────────────────────────────
//  Laila's assistant — knowledge base.
//  Each topic has keywords (what a recruiter might say) and an answer
//  (what the assistant speaks). Edit freely: answers are read aloud,
//  so write them as natural spoken sentences.
//
//  Keyword tips:
//   • lowercase; a word also matches longer words that start with it
//     ("achiev" matches "achievement", "achieved", "achievements")
//   • words under 4 letters must match exactly ("pr", "seo", "ai")
//   • multi-word phrases match as written ("media relations")
//   • weight: how strongly a keyword points to this topic (default 1)
// ─────────────────────────────────────────────────────────────

window.KNOWLEDGE = {
  greeting:
    "Hello! I'm Laila's assistant. You can ask me about her experience, achievements, skills, languages or education.",

  fallback:
    "That's a good question, but it isn't something I can answer from Laila's CV. She'd be happy to discuss it with you directly. You can email her at laila dot zohdy ninety-eight at gmail dot com. Meanwhile, you could ask me about her experience, her achievements, or her skills.",

  topics: [
    {
      id: "hello",
      keys: [["hello", 2], ["hi", 2], ["hey", 2], ["good morning", 2], ["good afternoon", 2], ["bonjour", 2]],
      answer:
        "Hello, and thanks for stopping by! I'm Laila's assistant. What would you like to know about her?",
    },
    {
      id: "thanks",
      keys: [["thank", 2], ["thanks", 2], ["bye", 2], ["goodbye", 2], ["great", 0.5], ["perfect", 1]],
      answer:
        "You're very welcome. If you'd like to take the next step, Laila would be glad to hear from you by email. Thank you for your interest!",
    },
    {
      id: "intro",
      keys: [["tell me about", 2], ["who is", 2], ["about her", 2], ["about laila", 2], ["introduc", 2], ["summary", 2], ["summar", 2], ["overview", 2], ["background", 2], ["30 seconds", 3], ["elevator", 3], ["profile", 1], ["describe", 1]],
      answer:
        "Laila is a Communications and Marketing Project Manager based in Paris, with more than five years of experience in international environments. She builds and runs communications functions end to end, covering strategy, content, PR, social, SEO and paid. Her track record includes more than 400 percent audience growth, over 280 applications from a single launch, and a number one branded search ranking within two months. She's bilingual in English and Arabic, and speaks French at a B2 level.",
    },
    {
      id: "experience",
      keys: [["experience", 2], ["career", 2], ["work history", 3], ["previous", 1], ["roles", 1], ["jobs", 1], ["worked", 1], ["years", 1], ["companies", 2], ["employers", 2]],
      answer:
        "Laila has more than five years of experience. She's currently the Communications and Marketing Project Manager at Tzkrti, an event-tech startup, where she runs the marketing function alongside the CEO. Before that, she was Global Communications Manager at Ledvance, the lighting company formerly part of Osram. She spent three years at Accenture, where she was promoted from Media Analyst to Senior Media Analyst. She started out at Radio Free Europe slash Radio Liberty as a copywriter and editor intern.",
    },
    {
      id: "current",
      keys: [["tzkrti", 4], ["current", 2], ["currently", 2], ["right now", 2], ["present", 1], ["startup", 2], ["event", 1], ["today", 1]],
      answer:
        "Since August 2025, Laila has been the Communications and Marketing Project Manager at Tzkrti, an event-tech startup, working remotely from Paris as the company's solo marketing function. She works directly with the CEO on strategy, content, PR and paid campaigns. She also manages timelines, budgets and briefs, and coordinates an in-house designer, a marketing consultant and an external SEO agency. She turns the analytics into monthly executive reports with recommended actions.",
    },
    {
      id: "ledvance",
      keys: [["ledvance", 4], ["osram", 4], ["lighting", 3], ["global communications manager", 4], ["prague", 1]],
      answer:
        "At Ledvance, the global lighting company formerly part of Osram, Laila was Global Communications Manager from June 2024 to July 2025, based in Prague. She supported the Head of Brand and Communications on global campaigns across LinkedIn, Instagram, Facebook and YouTube, tied to product launches. She was the main contact for creative and PR agencies and coordinated sustainability communications. She also tracked social KPIs every week, handled the press inbox and media relations, and produced internal newsletters for all employees worldwide.",
    },
    {
      id: "accenture",
      keys: [["accenture", 4], ["media analyst", 4], ["senior media analyst", 4], ["analyst", 2], ["monitoring", 2], ["promot", 2], ["consulting", 2]],
      answer:
        "Laila spent three years at Accenture in Prague. She joined as a Media Analyst in 2021 and was promoted to Senior Media Analyst within two years. As a Senior Analyst, she delivered four daily executive-level media reports and two biweekly digests to managing directors and the CEO. She also led competitor analysis, handled real-time crisis monitoring and escalation, built Boolean search dashboards, and mentored three to five junior analysts.",
    },
    {
      id: "rferl",
      keys: [["radio", 4], ["free europe", 4], ["liberty", 4], ["intern", 3], ["internship", 3], ["journalis", 2], ["newsroom", 3], ["translat", 2]],
      answer:
        "Laila began her career at Radio Free Europe slash Radio Liberty as a copywriter and editor intern, from late 2019 to early 2020. She translated and adapted breaking news from Arabic into English for digital publication, under tight editorial deadlines. It fits her journalism background, since her degree has a journalism major.",
    },
    {
      id: "achievements",
      keys: [["achiev", 3], ["accomplish", 3], ["proud", 3], ["results", 2], ["success", 2], ["impact", 2], ["wins", 2], ["highlights", 2], ["numbers", 1], ["growth", 2], ["track record", 3], ["best work", 3]],
      answer:
        "Three results stand out. Laila drove more than 400 percent audience growth. A single launch she ran brought in over 280 applications. And she achieved a number one branded search ranking in just two months. At Accenture, she was also promoted to Senior Analyst within two years and trusted with daily reports for the CEO.",
    },
    {
      id: "pr",
      keys: [["pr", 3], ["press", 3], ["media relations", 4], ["public relations", 4], ["journalists", 3], ["press release", 4], ["media", 1], ["influencer", 2], ["partnership", 2], ["outreach", 2]],
      answer:
        "PR and media relations run through Laila's whole career. At Ledvance, she managed the corporate press inbox, handled media relations, and was the main contact for the PR agencies. At Tzkrti, she drafts and reviews press materials and coordinates media, influencer and partnership outreach. Her years in media monitoring at Accenture, plus her journalism training, give her a strong sense of how journalists think.",
    },
    {
      id: "social",
      keys: [["social", 3], ["linkedin", 2], ["instagram", 3], ["facebook", 3], ["youtube", 3], ["content", 2], ["community", 2], ["audience", 2]],
      answer:
        "Laila has managed social media at a global level. At Ledvance, she ran communications across LinkedIn, Instagram, Facebook and YouTube, aligned with international product launches. She tracked KPIs weekly using Emplifi, LinkedIn Analytics and Meta Business Manager, and turned the data into optimisation decisions for senior stakeholders. She has also grown an audience by more than 400 percent.",
    },
    {
      id: "digital",
      keys: [["seo", 4], ["search", 2], ["paid", 3], ["ads", 3], ["advertising", 3], ["digital", 2], ["performance", 2], ["email marketing", 4], ["newsletter", 2], ["klaviyo", 2], ["brevo", 2]],
      answer:
        "On the digital side, Laila covers SEO, paid campaigns and email marketing. At Tzkrti, she works with an external SEO agency and achieved a number one branded search ranking in two months. She also runs paid campaigns with Meta Ads Manager, and holds a HubSpot SEO certification. For email, she has used Klaviyo and Brevo, including internal newsletters sent to all of Ledvance's global employees.",
    },
    {
      id: "crisis",
      keys: [["crisis", 4], ["escalat", 3], ["reputation", 3], ["issues management", 4], ["pressure", 2]],
      answer:
        "Laila has hands-on crisis experience from Accenture. She handled real-time crisis monitoring, escalation and briefing for senior leadership. Her reports reached managing directors and the CEO, so the work called for accuracy, discretion and strict deadlines.",
    },
    {
      id: "internal",
      keys: [["internal", 4], ["employee", 3], ["employer brand", 3], ["intranet", 3]],
      answer:
        "Yes, Laila has internal communications experience. At Ledvance, she produced internal newsletters through Klaviyo that went to all global employees. At Accenture, she helped draft internal press releases and plan communications.",
    },
    {
      id: "analytics",
      keys: [["analytic", 3], ["data", 3], ["report", 2], ["kpi", 3], ["dashboard", 3], ["power bi", 3], ["measure", 2], ["metrics", 3], ["insights", 2]],
      answer:
        "Laila is very comfortable with data. At Tzkrti, she prepares monthly performance reports that turn analytics into executive summaries with recommended actions. At Ledvance, she reported social KPIs every week. At Accenture, she built Boolean queries and monitoring dashboards. Her tools include Google Analytics, Power BI, Meltwater, Emplifi and Factiva, and she's certified in Google Analytics and Meltwater reporting.",
    },
    {
      id: "tools",
      keys: [["tools", 3], ["software", 3], ["platforms", 2], ["tech stack", 3], ["meltwater", 2], ["emplifi", 2], ["factiva", 2], ["canva", 2], ["asana", 2], ["monday", 2], ["google workspace", 2], ["slides", 1]],
      answer:
        "For analytics and reporting, Laila uses Meltwater, Emplifi, Factiva, Power BI, Google Analytics and Meta Ads Manager. For email, she uses Klaviyo and Brevo. For design and presentations, she works in Canva and Google Slides. For project management, she uses Asana, Monday.com and Google Workspace. She also uses AI tools like Claude and ChatGPT every day.",
    },
    {
      id: "ai",
      keys: [["ai", 4], ["artificial intelligence", 4], ["chatgpt", 4], ["claude", 4], ["generative", 4], ["genai", 4], ["automation", 2]],
      answer:
        "Laila uses AI tools like Claude and ChatGPT every day for research, drafting and speeding up her workflow. She also completed Accenture's Introduction to Generative AI certification. Fittingly, this voice assistant is part of her portfolio.",
    },
    {
      id: "pm",
      keys: [["project manag", 4], ["organi", 2], ["deadline", 2], ["budget", 3], ["timeline", 3], ["planning", 2], ["priorit", 2], ["multitask", 3], ["workstreams", 3], ["calendar", 2]],
      answer:
        "Project management is central to Laila's work, and she's Google Project Management certified. At Tzkrti, she manages timelines, budgets and briefs across several workstreams, so deliverables stay on track, on brand and aligned with company priorities. She also keeps shared drives, content calendars and templates organised, so the team always has what it needs.",
    },
    {
      id: "stakeholders",
      keys: [["agenc", 3], ["stakeholder", 3], ["vendor", 3], ["coordinat", 2], ["collaborat", 2], ["cross-functional", 3], ["cross functional", 3], ["teamwork", 2], ["work with", 1], ["ceo", 2], ["executive", 2]],
      answer:
        "Coordinating people is one of Laila's strengths. At Tzkrti, she's the main contact and quality reviewer for a designer, a marketing consultant and an SEO agency, and she reports directly to the CEO. At Ledvance, she briefed creative and PR agencies, managed approval workflows, and connected the sustainability team with the brand function.",
    },
    {
      id: "leadership",
      keys: [["lead", 2], ["leadership", 3], ["mentor", 4], ["manage people", 4], ["team size", 3], ["direct reports", 4], ["managed a team", 4], ["junior", 2]],
      answer:
        "At Accenture, Laila mentored three to five junior analysts. Today she leads day-to-day work with a designer, a marketing consultant and an SEO agency, setting direction and reviewing their output. She's comfortable owning a function on her own, as she does at Tzkrti, and working closely with senior leadership.",
    },
    {
      id: "writing",
      keys: [["writ", 2], ["copywrit", 4], ["editing", 3], ["editor", 3], ["copy", 2], ["storytelling", 3], ["press materials", 3]],
      answer:
        "Writing is at the core of what Laila does. She trained in journalism and started as a copywriter and editor at Radio Free Europe slash Radio Liberty. Today she drafts and reviews press materials, newsletters and promotional copy before they go out.",
    },
    {
      id: "sustainability",
      keys: [["sustainab", 4], ["esg", 4], ["csr", 4], ["environment", 2]],
      answer:
        "At Ledvance, Laila coordinated sustainability communications projects. She managed the flow of information and materials between the sustainability team and the brand function.",
    },
    {
      id: "international",
      keys: [["international", 3], ["global", 2], ["multicultural", 4], ["countries", 2], ["abroad", 2], ["cultur", 2], ["markets", 2]],
      answer:
        "Laila's whole career has been international. She has worked in the Czech Republic and France, handled multi-market B2B and B2C communications at Ledvance, and reported to global leadership at Accenture. She's bilingual in English and Arabic, speaks French, and is used to working across cultures and time zones.",
    },
    {
      id: "languages",
      keys: [["language", 4], ["speak", 2], ["french", 3], ["arabic", 3], ["english", 3], ["bilingual", 4], ["fluent", 3]],
      answer:
        "Laila is bilingual in English and Arabic. She also speaks French at an intermediate B2 level, which she uses day to day living in Paris.",
    },
    {
      id: "education",
      keys: [["education", 4], ["degree", 4], ["university", 4], ["studied", 3], ["study", 2], ["teesside", 4], ["bachelor", 4], ["ba", 2], ["graduat", 3], ["school", 2]],
      answer:
        "Laila has a BA in Creative Media Production with a journalism major from Teesside University, completed in June 2020 on the UK and Czech programme.",
    },
    {
      id: "certs",
      keys: [["certif", 4], ["course", 3], ["training", 2], ["qualification", 3]],
      answer:
        "Laila holds several certifications: Google Project Management, Google Analytics, HubSpot SEO, Meltwater Reporting and Dashboards, and Introduction to Generative AI from Accenture.",
    },
    {
      id: "location",
      keys: [["where", 2], ["based", 3], ["location", 4], ["live", 2], ["paris", 3], ["france", 2], ["visa", 4], ["permit", 4], ["authori", 4], ["relocat", 3], ["remote", 3], ["hybrid", 3], ["on site", 3], ["onsite", 3], ["office", 2]],
      answer:
        "Laila is based in Paris and is authorised to work in France. She currently works remotely, and she has worked from offices in Prague. For questions about relocation or a specific working arrangement, she'd be happy to discuss them directly.",
    },
    {
      id: "fit",
      keys: [["why should", 4], ["why hire", 4], ["hire her", 4], ["fit", 3], ["good candidate", 4], ["strength", 3], ["stand out", 3], ["unique", 3], ["value", 2], ["bring", 2], ["right person", 4], ["qualified", 3], ["suitable", 3]],
      answer:
        "Laila brings an unusual mix. She thinks strategically, delivers hands-on, and is rigorous about data. She can run a communications function end to end on her own, as she does at Tzkrti, and she has also worked inside large global organisations like Ledvance and Accenture. Her results speak for themselves: more than 400 percent audience growth, over 280 applications from one launch, and a number one search ranking in two months. Add three languages and a journalism background, and she can step into a role and add value quickly.",
    },
    {
      id: "weakness",
      keys: [["weakness", 4], ["improve", 2], ["challenge", 2], ["difficult", 2], ["mistake", 3], ["failure", 3]],
      answer:
        "That's a great interview question, and one Laila would rather answer in person, so you get a real and thoughtful answer. You can reach her by email at laila dot zohdy ninety-eight at gmail dot com.",
    },
    {
      id: "logistics",
      keys: [["salary", 5], ["pay", 3], ["compensation", 5], ["rate", 2], ["expectation", 3], ["notice", 4], ["available", 3], ["availability", 4], ["start date", 5], ["when can she start", 5], ["freelance", 3], ["full time", 3], ["part time", 3], ["contract", 2]],
      answer:
        "Salary expectations, availability and contract details are best discussed with Laila directly. Please email her at laila dot zohdy ninety-eight at gmail dot com, and she'll get back to you.",
    },
    {
      id: "contact",
      keys: [["contact", 5], ["email", 5], ["reach", 4], ["get in touch", 5], ["phone", 4], ["interview", 3], ["call", 2], ["meet", 2], ["cv", 2], ["resume", 2], ["portfolio", 3]],
      answer:
        "The best way to reach Laila is by email, at laila dot zohdy ninety-eight at gmail dot com. You'll also find her LinkedIn, her portfolio, and a download link for her full CV at the top of this page.",
    },
  ],
};
