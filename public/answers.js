// ─────────────────────────────────────────────────────────────
//  Laila's assistant — knowledge base (English · Français · العربية)
//
//  Each topic has:
//   • keys:   words a recruiter might use, per language, as [word, weight]
//   • answer: what the assistant says, per language (read aloud, so
//             write natural spoken sentences)
//
//  Keyword tips:
//   • Accents, Arabic diacritics and letter variants (أ/إ/ا, ة/ه, ى/ي)
//     are ignored, so write keys naturally.
//   • English/French: a word also matches longer words starting with it
//     ("achiev" → "achievements"); words under 4 letters must match exactly.
//   • Arabic: a key matches anywhere inside the question (so "خبرة" also
//     matches "الخبرة"). Avoid very short Arabic keys.
//   • Start a key with "=" to require an exact word ("=intern" won't match
//     "international").
//   • Keys from every language are used for matching; the answer is given
//     in the language selected on the page.
// ─────────────────────────────────────────────────────────────

window.KNOWLEDGE = {
  greeting: {
    en: "Hello, I'm Laila's assistant. Ask me anything about her experience, skills or achievements — by voice or by typing below.",
    fr: "Bonjour, je suis l'assistante de Laila. Posez-moi vos questions sur son expérience, ses compétences ou ses réalisations, à voix haute ou par écrit ci-dessous.",
    ar: "مرحباً، أنا مساعدة ليلى. اسألني عن خبراتها أو مهاراتها أو إنجازاتها، بصوتك أو بالكتابة في الأسفل.",
  },

  fallback: {
    en: "That's a good question, but it isn't something I can answer from Laila's CV. She'd be happy to discuss it with you directly. You can email her at laila dot zohdy ninety-eight at gmail dot com. Meanwhile, you could ask me about her experience, her achievements, or her skills.",
    fr: "C'est une bonne question, mais je ne peux pas y répondre à partir du CV de Laila. Elle sera ravie d'en parler directement avec vous : vous pouvez lui écrire à l'adresse e-mail indiquée en bas de cette page. En attendant, interrogez-moi sur son expérience, ses réalisations ou ses compétences.",
    ar: "سؤال جيد، لكن لا يمكنني الإجابة عنه من سيرة ليلى الذاتية. سيسعدها مناقشته معك مباشرة عبر البريد الإلكتروني الموجود أسفل هذه الصفحة. وفي الأثناء، يمكنك سؤالي عن خبراتها أو إنجازاتها أو مهاراتها.",
  },

  topics: [
    {
      id: "hello",
      keys: {
        en: [["hello", 2], ["hi", 2], ["hey", 2], ["good morning", 2], ["good afternoon", 2]],
        fr: [["bonjour", 2], ["salut", 2], ["bonsoir", 2]],
        ar: [["مرحبا", 2], ["أهلا", 2], ["السلام عليكم", 2], ["صباح الخير", 2], ["مساء الخير", 2]],
      },
      answer: {
        en: "Hello, and thanks for stopping by! I'm Laila's assistant. What would you like to know about her?",
        fr: "Bonjour, et merci de votre visite ! Je suis l'assistante de Laila. Que souhaitez-vous savoir sur elle ?",
        ar: "أهلاً وسهلاً، وشكراً لزيارتك! أنا مساعدة ليلى. ماذا تودّ أن تعرف عنها؟",
      },
    },
    {
      id: "thanks",
      keys: {
        en: [["thank", 2], ["thanks", 2], ["bye", 2], ["goodbye", 2], ["great", 0.5], ["perfect", 1]],
        fr: [["merci", 2], ["au revoir", 2], ["parfait", 1]],
        ar: [["شكرا", 2], ["مع السلامة", 2], ["ممتاز", 1]],
      },
      answer: {
        en: "You're very welcome. If you'd like to take the next step, Laila would be glad to hear from you by email. Thank you for your interest!",
        fr: "Avec plaisir. Si vous souhaitez aller plus loin, Laila sera ravie d'échanger avec vous par e-mail. Merci de votre intérêt !",
        ar: "على الرحب والسعة. إذا رغبت في الخطوة التالية، فستسعد ليلى بتواصلك معها عبر البريد الإلكتروني. شكراً لاهتمامك!",
      },
    },
    {
      id: "intro",
      keys: {
        en: [["tell me about", 2], ["who is", 2], ["about her", 2], ["about laila", 2], ["introduc", 2], ["summary", 2], ["summar", 2], ["overview", 2], ["background", 2], ["30 seconds", 3], ["elevator", 3], ["profile", 1], ["describe", 1]],
        fr: [["parlez moi", 2], ["parle moi", 2], ["présente", 2], ["presentez", 2], ["qui est", 2], ["en bref", 2], ["synthèse", 2], ["profil", 1], ["30 secondes", 3]],
        ar: [["عرفني", 2], ["عرفيني", 2], ["حدثني عن", 2], ["حدثيني عن", 2], ["أخبرني عن", 2], ["أخبريني عن", 2], ["من هي", 2], ["نبذة", 2], ["ملخص", 2], ["تعريف", 2], ["30 ثانية", 3]],
      },
      answer: {
        en: "Laila is a Communications and Marketing Project Manager based in Paris, with more than five years of experience in international environments. She builds and runs communications functions end to end, covering strategy, content, PR, social, SEO and paid. Her track record includes more than 400 percent audience growth, over 280 applications from a single launch, and a number one branded search ranking within two months. She's bilingual in English and Arabic, and speaks French at a B2 level.",
        fr: "Laila est chargée de projets communication et marketing, basée à Paris, avec plus de cinq ans d'expérience dans des environnements internationaux. Elle construit et pilote des fonctions communication de bout en bout : stratégie, contenu, relations presse, réseaux sociaux, SEO et campagnes payantes. Parmi ses résultats : une croissance d'audience de plus de 400 %, plus de 280 candidatures générées par un seul lancement, et la première place en recherche de marque en deux mois. Elle est bilingue anglais et arabe, et parle français au niveau B2.",
        ar: "ليلى مديرة مشاريع في مجال الاتصال والتسويق، مقيمة في باريس، ولديها أكثر من خمس سنوات من الخبرة في بيئات عمل دولية. تبني وتدير وظائف الاتصال بالكامل، من الاستراتيجية والمحتوى إلى العلاقات الإعلامية ووسائل التواصل الاجتماعي وتحسين محركات البحث والحملات المدفوعة. ومن أبرز نتائجها نمو الجمهور بأكثر من 400 بالمئة، وأكثر من 280 طلب توظيف من إطلاق واحد، والوصول إلى المركز الأول في البحث عن العلامة التجارية خلال شهرين. وهي تتقن العربية والإنجليزية، وتتحدث الفرنسية بمستوى B2.",
      },
    },
    {
      id: "experience",
      keys: {
        en: [["experience", 2], ["career", 2], ["work history", 3], ["previous", 1], ["roles", 1], ["jobs", 1], ["worked", 1], ["years", 1], ["companies", 2], ["employers", 2]],
        fr: [["expérience", 2], ["parcours", 2], ["carrière", 2], ["postes", 1], ["entreprises", 2], ["années", 1]],
        ar: [["خبرة", 2], ["خبرت", 2], ["خبرات", 2], ["مسيرة", 2], ["مسيرت", 2], ["وظائف", 1], ["عملت", 1], ["سنوات", 1], ["شركات", 2]],
      },
      answer: {
        en: "Laila has more than five years of experience. She's currently the Communications and Marketing Project Manager at Tzkrti, an event-tech startup, where she runs the marketing function alongside the CEO. Before that, she was Global Communications Manager at Ledvance, the lighting company formerly part of Osram. She spent three years at Accenture, where she was promoted from Media Analyst to Senior Media Analyst. She started out at Radio Free Europe slash Radio Liberty as a copywriter and editor intern.",
        fr: "Laila a plus de cinq ans d'expérience. Elle est actuellement chargée de projets communication et marketing chez Tzkrti, une start-up de l'événementiel tech, où elle pilote le marketing aux côtés du CEO. Avant cela, elle était Global Communications Manager chez Ledvance, l'ancienne division éclairage d'Osram. Elle a passé trois ans chez Accenture, où elle a été promue de Media Analyst à Senior Media Analyst. Elle a débuté comme stagiaire rédactrice et éditrice à Radio Free Europe, Radio Liberty.",
        ar: "لدى ليلى أكثر من خمس سنوات من الخبرة. تعمل حالياً مديرة مشاريع الاتصال والتسويق في تذكرتي، وهي شركة ناشئة في تكنولوجيا الفعاليات، حيث تقود التسويق بالتعاون المباشر مع الرئيس التنفيذي. وقبل ذلك، شغلت منصب مديرة الاتصال العالمي في ليدفانس، شركة الإضاءة التي كانت جزءاً من أوسرام. وأمضت ثلاث سنوات في أكسنتشر، حيث تمت ترقيتها من محللة إعلامية إلى محللة إعلامية أولى. وبدأت مسيرتها متدربة في الكتابة والتحرير في إذاعة أوروبا الحرة، راديو ليبرتي.",
      },
    },
    {
      id: "current",
      keys: {
        en: [["tzkrti", 4], ["current", 2], ["currently", 2], ["right now", 2], ["present", 1], ["startup", 2], ["event", 1], ["today", 1]],
        fr: [["actuellement", 2], ["en ce moment", 2], ["poste actuel", 3], ["start up", 2], ["aujourd hui", 1]],
        ar: [["تذكرتي", 4], ["حاليا", 2], ["الآن", 2], ["الحالية", 2], ["ناشئة", 2]],
      },
      answer: {
        en: "Since August 2025, Laila has been the Communications and Marketing Project Manager at Tzkrti, an event-tech startup, working remotely from Paris as the company's solo marketing function. She works directly with the CEO on strategy, content, PR and paid campaigns. She also manages timelines, budgets and briefs, and coordinates an in-house designer, a marketing consultant and an external SEO agency. She turns the analytics into monthly executive reports with recommended actions.",
        fr: "Depuis août 2025, Laila est chargée de projets communication et marketing chez Tzkrti, une start-up de l'événementiel tech, en télétravail depuis Paris, où elle porte seule la fonction marketing. Elle travaille directement avec le CEO sur la stratégie, le contenu, les relations presse et les campagnes payantes. Elle gère les plannings, les budgets et les briefs, et coordonne un designer interne, un consultant marketing et une agence SEO externe. Elle transforme aussi les données analytiques en rapports mensuels pour la direction, avec des recommandations.",
        ar: "منذ أغسطس 2025، تعمل ليلى مديرة مشاريع الاتصال والتسويق في تذكرتي، وهي شركة ناشئة في تكنولوجيا الفعاليات، عن بُعد من باريس، وتتولى وحدها مسؤولية التسويق في الشركة. تعمل مباشرة مع الرئيس التنفيذي على الاستراتيجية والمحتوى والعلاقات الإعلامية والحملات المدفوعة. كما تدير الجداول الزمنية والميزانيات، وتنسّق العمل مع مصمم داخلي ومستشار تسويق ووكالة خارجية لتحسين محركات البحث. وتحوّل البيانات التحليلية إلى تقارير شهرية للإدارة مع توصيات عملية.",
      },
    },
    {
      id: "ledvance",
      keys: {
        en: [["ledvance", 4], ["osram", 4], ["lighting", 3], ["global communications manager", 4], ["prague", 1]],
        fr: [["éclairage", 3]],
        ar: [["ليدفانس", 4], ["أوسرام", 4], ["إضاءة", 3], ["براغ", 1]],
      },
      answer: {
        en: "At Ledvance, the global lighting company formerly part of Osram, Laila was Global Communications Manager from June 2024 to July 2025, based in Prague. She supported the Head of Brand and Communications on global campaigns across LinkedIn, Instagram, Facebook and YouTube, tied to product launches. She was the main contact for creative and PR agencies and coordinated sustainability communications. She also tracked social KPIs every week, handled the press inbox and media relations, and produced internal newsletters for all employees worldwide.",
        fr: "Chez Ledvance, le groupe international d'éclairage issu d'Osram, Laila a été Global Communications Manager de juin 2024 à juillet 2025, à Prague. Elle a épaulé la direction marque et communication sur des campagnes mondiales sur LinkedIn, Instagram, Facebook et YouTube, liées aux lancements de produits. Elle était l'interlocutrice principale des agences créatives et de relations presse, et coordonnait la communication sur le développement durable. Elle suivait aussi les KPI sociaux chaque semaine, gérait la boîte presse et les relations médias, et réalisait les newsletters internes destinées à tous les collaborateurs dans le monde.",
        ar: "في ليدفانس، شركة الإضاءة العالمية التي كانت جزءاً من أوسرام، شغلت ليلى منصب مديرة الاتصال العالمي من يونيو 2024 إلى يوليو 2025 في براغ. دعمت إدارة العلامة التجارية والاتصال في حملات عالمية على لينكدإن وإنستغرام وفيسبوك ويوتيوب مرتبطة بإطلاق المنتجات. وكانت جهة الاتصال الرئيسية مع الوكالات الإبداعية ووكالات العلاقات العامة، ونسّقت مشاريع الاتصال الخاصة بالاستدامة. كما تابعت مؤشرات الأداء على وسائل التواصل أسبوعياً، وأدارت البريد الصحفي والعلاقات الإعلامية، وأعدّت النشرات الداخلية لجميع موظفي الشركة حول العالم.",
      },
    },
    {
      id: "accenture",
      keys: {
        en: [["accenture", 4], ["media analyst", 4], ["senior media analyst", 4], ["analyst", 2], ["monitoring", 2], ["promot", 2], ["consulting", 2]],
        fr: [["analyste", 2], ["veille", 2], ["promue", 2], ["conseil", 1]],
        ar: [["أكسنتشر", 4], ["اكسنشر", 4], ["محللة", 3], ["محلل", 2], ["رصد", 2], ["ترقية", 2], ["ترقيت", 2]],
      },
      answer: {
        en: "Laila spent three years at Accenture in Prague. She joined as a Media Analyst in 2021 and was promoted to Senior Media Analyst within two years. As a Senior Analyst, she delivered four daily executive-level media reports and two biweekly digests to managing directors and the CEO. She also led competitor analysis, handled real-time crisis monitoring and escalation, built Boolean search dashboards, and mentored three to five junior analysts.",
        fr: "Laila a passé trois ans chez Accenture à Prague. Entrée comme Media Analyst en 2021, elle a été promue Senior Media Analyst en moins de deux ans. À ce poste, elle produisait chaque jour quatre rapports de veille médiatique pour les Managing Directors et le CEO, ainsi que deux synthèses toutes les deux semaines. Elle menait aussi des analyses concurrentielles, assurait la veille et l'escalade en situation de crise, créait des tableaux de bord à partir de requêtes booléennes, et encadrait trois à cinq analystes juniors.",
        ar: "أمضت ليلى ثلاث سنوات في أكسنتشر في براغ. انضمت بصفة محللة إعلامية عام 2021، وتمت ترقيتها إلى محللة إعلامية أولى خلال أقل من عامين. وفي هذا الدور، كانت تُعدّ يومياً أربعة تقارير رصد إعلامي لكبار المديرين والرئيس التنفيذي، إضافة إلى ملخصين كل أسبوعين. كما قادت تحليل المنافسين، وتولّت رصد الأزمات وتصعيدها في الوقت الفعلي، وأنشأت لوحات متابعة باستخدام استعلامات البحث المنطقية، وأشرفت على توجيه ثلاثة إلى خمسة محللين مبتدئين.",
      },
    },
    {
      id: "rferl",
      keys: {
        en: [["radio", 4], ["free europe", 4], ["liberty", 4], ["=intern", 3], ["=interns", 3], ["internship", 3], ["journalis", 2], ["newsroom", 3], ["translat", 2]],
        fr: [["stage", 3], ["stagiaire", 3], ["tradu", 2]],
        ar: [["إذاعة", 4], ["أوروبا الحرة", 4], ["ليبرتي", 4], ["تدريب", 3], ["متدربة", 3], ["صحافة", 2], ["ترجم", 2]],
      },
      answer: {
        en: "Laila began her career at Radio Free Europe slash Radio Liberty as a copywriter and editor intern, from late 2019 to early 2020. She translated and adapted breaking news from Arabic to English for digital publication, under tight editorial deadlines. It fits her journalism background, since her degree has a journalism major.",
        fr: "Laila a débuté à Radio Free Europe, Radio Liberty comme stagiaire rédactrice et éditrice, de fin 2019 à début 2020. Elle traduisait et adaptait de l'arabe vers l'anglais des informations de dernière minute pour publication en ligne, avec des délais éditoriaux serrés. Une expérience cohérente avec sa formation, puisque son diplôme comporte une majeure en journalisme.",
        ar: "بدأت ليلى مسيرتها في إذاعة أوروبا الحرة، راديو ليبرتي، متدربة في الكتابة والتحرير من أواخر 2019 إلى أوائل 2020. كانت تترجم الأخبار العاجلة من العربية إلى الإنجليزية وتكيّفها للنشر الرقمي ضمن مواعيد تحريرية صارمة، وهو ما ينسجم مع دراستها التي تخصصت فيها في الصحافة.",
      },
    },
    {
      id: "achievements",
      keys: {
        en: [["achiev", 3], ["accomplish", 3], ["proud", 3], ["results", 2], ["success", 2], ["impact", 2], ["wins", 2], ["highlights", 2], ["numbers", 1], ["growth", 2], ["track record", 3], ["best work", 3]],
        fr: [["réalisation", 3], ["réussite", 3], ["résultats", 2], ["fière", 3], ["succès", 2], ["croissance", 2], ["chiffres", 1], ["bilan", 2]],
        ar: [["إنجاز", 3], ["نجاح", 2], ["نتائج", 2], ["تفتخر", 3], ["فخور", 2], ["نمو", 2], ["أرقام", 1]],
      },
      answer: {
        en: "Three results stand out. Laila drove more than 400 percent audience growth. A single launch she ran brought in over 280 applications. And she achieved a number one branded search ranking in just two months. At Accenture, she was also promoted to Senior Analyst within two years and trusted with daily reports for the CEO.",
        fr: "Trois résultats se distinguent. Laila a généré une croissance d'audience de plus de 400 %. Un seul lancement qu'elle a piloté a attiré plus de 280 candidatures. Et elle a obtenu la première place en recherche de marque en seulement deux mois. Chez Accenture, elle a aussi été promue Senior Analyst en moins de deux ans, avec des rapports quotidiens destinés au CEO.",
        ar: "تبرز ثلاث نتائج. حققت ليلى نمواً في الجمهور بأكثر من 400 بالمئة، وجلب إطلاق واحد أدارته أكثر من 280 طلب توظيف، ووصلت بالعلامة التجارية إلى المركز الأول في نتائج البحث خلال شهرين فقط. كما تمت ترقيتها في أكسنتشر إلى محللة أولى خلال أقل من عامين، وأُوكلت إليها تقارير يومية للرئيس التنفيذي.",
      },
    },
    {
      id: "pr",
      keys: {
        en: [["pr", 3], ["press", 3], ["media relations", 4], ["public relations", 4], ["journalists", 3], ["press release", 4], ["media", 1], ["influencer", 2], ["partnership", 2], ["outreach", 2]],
        fr: [["rp", 3], ["relations presse", 4], ["relations médias", 4], ["journalistes", 3], ["communiqué", 3], ["influenceu", 2], ["partenariat", 2], ["médias", 1]],
        ar: [["علاقات", 3], ["إعلام", 2], ["صحفي", 3], ["مؤثرين", 2], ["شراكات", 2]],
      },
      answer: {
        en: "PR and media relations run through Laila's whole career. At Ledvance, she managed the corporate press inbox, handled media relations, and was the main contact for the PR agencies. At Tzkrti, she drafts and reviews press materials and coordinates media, influencer and partnership outreach. Her years in media monitoring at Accenture, plus her journalism training, give her a strong sense of how journalists think.",
        fr: "Les relations presse et médias traversent tout le parcours de Laila. Chez Ledvance, elle gérait la boîte presse et les relations médias, et était l'interlocutrice principale des agences RP. Chez Tzkrti, elle rédige et relit les supports presse, et coordonne les actions auprès des médias, des influenceurs et des partenaires. Ses années de veille médiatique chez Accenture et sa formation de journaliste lui donnent une vraie compréhension du point de vue des journalistes.",
        ar: "العلاقات الإعلامية حاضرة في كل مراحل مسيرة ليلى. في ليدفانس، أدارت البريد الصحفي والعلاقات مع وسائل الإعلام، وكانت جهة الاتصال الرئيسية مع وكالات العلاقات العامة. وفي تذكرتي، تكتب المواد الصحفية وتراجعها، وتنسّق التواصل مع وسائل الإعلام والمؤثرين والشركاء. كما أن سنوات الرصد الإعلامي في أكسنتشر ودراستها للصحافة منحتها فهماً عميقاً لطريقة تفكير الصحفيين.",
      },
    },
    {
      id: "social",
      keys: {
        en: [["social", 3], ["linkedin", 2], ["instagram", 3], ["facebook", 3], ["youtube", 3], ["content", 2], ["community", 2], ["audience", 2]],
        fr: [["réseaux sociaux", 4], ["réseaux", 2], ["contenu", 2], ["communauté", 2]],
        ar: [["اجتماعي", 4], ["سوشيال", 4], ["لينكد", 2], ["انستغرام", 3], ["انستجرام", 3], ["فيسبوك", 3], ["يوتيوب", 3], ["محتوى", 2], ["جمهور", 2]],
      },
      answer: {
        en: "Laila has managed social media at a global level. At Ledvance, she ran communications across LinkedIn, Instagram, Facebook and YouTube, aligned with international product launches. She tracked KPIs weekly using Emplifi, LinkedIn Analytics and Meta Business Manager, and turned the data into optimisation decisions for senior stakeholders. She has also grown an audience by more than 400 percent.",
        fr: "Laila a géré les réseaux sociaux à l'échelle mondiale. Chez Ledvance, elle pilotait la communication sur LinkedIn, Instagram, Facebook et YouTube, en lien avec les lancements produits internationaux. Elle suivait les KPI chaque semaine avec Emplifi, LinkedIn Analytics et Meta Business Manager, et traduisait les données en décisions d'optimisation pour la direction. Elle a aussi fait croître une audience de plus de 400 %.",
        ar: "أدارت ليلى وسائل التواصل الاجتماعي على نطاق عالمي. في ليدفانس، قادت الاتصال عبر لينكدإن وإنستغرام وفيسبوك ويوتيوب بما يتماشى مع إطلاق المنتجات دولياً. وتابعت مؤشرات الأداء أسبوعياً باستخدام أدوات مثل إمبليفاي وتحليلات لينكدإن وميتا بيزنس مانجر، وحوّلت البيانات إلى قرارات تحسين للإدارة العليا. كما حققت نمواً في الجمهور بأكثر من 400 بالمئة.",
      },
    },
    {
      id: "digital",
      keys: {
        en: [["seo", 4], ["search", 2], ["paid", 3], ["ads", 3], ["advertising", 3], ["digital", 2], ["performance", 2], ["email marketing", 6], ["newsletter", 2], ["klaviyo", 2], ["brevo", 2]],
        fr: [["référencement", 4], ["payant", 3], ["publicité", 3], ["mailing", 5], ["numérique", 2]],
        ar: [["سيو", 4], ["محركات البحث", 4], ["إعلانات", 3], ["مدفوع", 3], ["رقمي", 2], ["تسويق عبر البريد", 4], ["نشرة", 2]],
      },
      answer: {
        en: "On the digital side, Laila covers SEO, paid campaigns and email marketing. At Tzkrti, she works with an external SEO agency and achieved a number one branded search ranking in two months. She also runs paid campaigns with Meta Ads Manager, and holds a HubSpot SEO certification. For email, she has used Klaviyo and Brevo, including internal newsletters sent to all of Ledvance's global employees.",
        fr: "Côté digital, Laila maîtrise le SEO, les campagnes payantes et l'e-mailing. Chez Tzkrti, elle travaille avec une agence SEO externe et a obtenu la première place en recherche de marque en deux mois. Elle gère aussi des campagnes payantes avec Meta Ads Manager, et elle est certifiée HubSpot SEO. Pour l'e-mailing, elle utilise Klaviyo et Brevo, notamment pour les newsletters internes envoyées à tous les collaborateurs de Ledvance.",
        ar: "في المجال الرقمي، تتقن ليلى تحسين محركات البحث والحملات المدفوعة والتسويق عبر البريد الإلكتروني. في تذكرتي، تعمل مع وكالة خارجية لتحسين محركات البحث، ووصلت بالعلامة التجارية إلى المركز الأول في البحث خلال شهرين. كما تدير حملات مدفوعة عبر ميتا، وهي حاصلة على شهادة هب سبوت في تحسين محركات البحث. وللبريد الإلكتروني، استخدمت كلافيو وبريفو، بما في ذلك النشرات الداخلية لجميع موظفي ليدفانس حول العالم.",
      },
    },
    {
      id: "crisis",
      keys: {
        en: [["crisis", 4], ["escalat", 3], ["reputation", 3], ["issues management", 4], ["pressure", 2]],
        fr: [["crise", 4], ["escalade", 3], ["réputation", 3], ["pression", 2]],
        ar: [["أزمة", 4], ["أزمات", 4], ["تصعيد", 3], ["سمعة", 3], ["ضغط", 2]],
      },
      answer: {
        en: "Laila has hands-on crisis experience from Accenture. She handled real-time crisis monitoring, escalation and briefing for senior leadership. Her reports reached managing directors and the CEO, so the work called for accuracy, discretion and strict deadlines.",
        fr: "Laila a une expérience concrète de la gestion de crise, acquise chez Accenture. Elle y assurait la veille en temps réel, l'escalade et les briefings pour la direction. Ses rapports étaient lus par les Managing Directors et le CEO, ce qui exigeait rigueur, discrétion et respect strict des délais.",
        ar: "اكتسبت ليلى خبرة عملية في إدارة الأزمات خلال عملها في أكسنتشر، حيث تولّت رصد الأزمات في الوقت الفعلي وتصعيدها وإعداد الإحاطات للقيادة العليا. وكانت تقاريرها تصل إلى كبار المديرين والرئيس التنفيذي، ما تطلّب دقة عالية وسرية والتزاماً صارماً بالمواعيد.",
      },
    },
    {
      id: "internal",
      keys: {
        en: [["internal", 4], ["employee", 3], ["employer brand", 3], ["intranet", 3]],
        fr: [["interne", 4], ["collaborateurs", 3], ["salariés", 3]],
        ar: [["داخلي", 4], ["موظفين", 3]],
      },
      answer: {
        en: "Yes, Laila has internal communications experience. At Ledvance, she produced internal newsletters through Klaviyo that went to all global employees. At Accenture, she helped draft internal press releases and plan communications.",
        fr: "Oui, Laila a de l'expérience en communication interne. Chez Ledvance, elle réalisait avec Klaviyo les newsletters internes envoyées à tous les collaborateurs dans le monde. Chez Accenture, elle a contribué à la rédaction de communiqués internes et à la planification de la communication.",
        ar: "نعم، لدى ليلى خبرة في الاتصال الداخلي. في ليدفانس، أعدّت النشرات الداخلية عبر كلافيو وأرسلتها إلى جميع موظفي الشركة حول العالم. وفي أكسنتشر، ساهمت في صياغة البيانات الصحفية الداخلية وتخطيط الاتصال.",
      },
    },
    {
      id: "analytics",
      keys: {
        en: [["analytic", 3], ["data", 3], ["report", 2], ["kpi", 3], ["dashboard", 3], ["power bi", 3], ["measure", 2], ["metrics", 3], ["insights", 2]],
        fr: [["données", 3], ["analyse", 3], ["rapport", 2], ["tableau de bord", 3], ["mesur", 2], ["indicateurs", 3]],
        ar: [["بيانات", 3], ["تحليل", 3], ["تقارير", 2], ["مؤشرات", 3], ["لوحات", 3], ["قياس", 2]],
      },
      answer: {
        en: "Laila is very comfortable with data. At Tzkrti, she prepares monthly performance reports that turn analytics into executive summaries with recommended actions. At Ledvance, she reported social KPIs every week. At Accenture, she built Boolean queries and monitoring dashboards. Her tools include Google Analytics, Power BI, Meltwater, Emplifi and Factiva, and she's certified in Google Analytics and Meltwater reporting.",
        fr: "Laila est très à l'aise avec les données. Chez Tzkrti, elle prépare des rapports de performance mensuels qui transforment les données en synthèses pour la direction, avec des recommandations. Chez Ledvance, elle suivait les KPI sociaux chaque semaine, et chez Accenture, elle construisait des requêtes booléennes et des tableaux de bord de veille. Elle utilise Google Analytics, Power BI, Meltwater, Emplifi et Factiva, et elle est certifiée Google Analytics et Meltwater.",
        ar: "ليلى متمكنة جداً في التعامل مع البيانات. في تذكرتي، تُعدّ تقارير أداء شهرية تحوّل البيانات إلى ملخصات تنفيذية مع توصيات. وفي ليدفانس، تابعت مؤشرات أداء التواصل الاجتماعي أسبوعياً، وفي أكسنتشر بنت استعلامات بحث ولوحات متابعة. وتستخدم أدوات مثل جوجل أناليتكس وباور بي آي وميلتووتر، وهي حاصلة على شهادتي جوجل أناليتكس وميلتووتر.",
      },
    },
    {
      id: "tools",
      keys: {
        en: [["tools", 3], ["software", 3], ["platforms", 2], ["tech stack", 3], ["meltwater", 2], ["emplifi", 2], ["factiva", 2], ["canva", 2], ["asana", 2], ["monday", 2], ["google workspace", 2], ["slides", 1]],
        fr: [["outils", 3], ["logiciels", 3], ["plateformes", 2]],
        ar: [["أدوات", 3], ["برامج", 3], ["منصات", 2]],
      },
      answer: {
        en: "For analytics and reporting, Laila uses Meltwater, Emplifi, Factiva, Power BI, Google Analytics and Meta Ads Manager. For email, she uses Klaviyo and Brevo. For design and presentations, she works in Canva and Google Slides. For project management, she uses Asana, Monday.com and Google Workspace. She also uses AI tools like Claude and ChatGPT every day.",
        fr: "Pour l'analyse et le reporting, Laila utilise Meltwater, Emplifi, Factiva, Power BI, Google Analytics et Meta Ads Manager. Pour l'e-mailing, Klaviyo et Brevo. Pour le design et les présentations, Canva et Google Slides. Pour la gestion de projet, Asana, Monday.com et Google Workspace. Et elle utilise chaque jour des outils d'IA comme Claude et ChatGPT.",
        ar: "في التحليل وإعداد التقارير، تستخدم ليلى ميلتووتر وإمبليفاي وفاكتيفا وباور بي آي وجوجل أناليتكس ومدير إعلانات ميتا. وفي البريد الإلكتروني، كلافيو وبريفو. وفي التصميم والعروض التقديمية، كانفا وجوجل سلايدز. وفي إدارة المشاريع، أسانا ومانداي وجوجل ووركسبيس. كما تستخدم يومياً أدوات الذكاء الاصطناعي مثل كلود وتشات جي بي تي.",
      },
    },
    {
      id: "ai",
      keys: {
        en: [["ai", 4], ["artificial intelligence", 4], ["chatgpt", 4], ["claude", 4], ["generative", 4], ["genai", 4], ["automation", 2]],
        fr: [["ia", 4], ["intelligence artificielle", 4], ["générative", 4]],
        ar: [["ذكاء", 4], ["شات جي بي تي", 4], ["توليدي", 3]],
      },
      answer: {
        en: "Laila uses AI tools like Claude and ChatGPT every day for research, drafting and speeding up her workflow. She also completed Accenture's Introduction to Generative AI certification. Fittingly, this voice assistant is part of her portfolio.",
        fr: "Laila utilise chaque jour des outils d'IA comme Claude et ChatGPT pour la recherche, la rédaction et pour accélérer son travail. Elle a aussi obtenu la certification Introduction à l'IA générative d'Accenture. D'ailleurs, cette assistante vocale fait partie de son portfolio.",
        ar: "تستخدم ليلى أدوات الذكاء الاصطناعي مثل كلود وتشات جي بي تي يومياً في البحث والكتابة وتسريع سير العمل. كما حصلت على شهادة مقدمة في الذكاء الاصطناعي التوليدي من أكسنتشر. وهذه المساعدة الصوتية نفسها جزء من أعمالها.",
      },
    },
    {
      id: "pm",
      keys: {
        en: [["project manag", 4], ["organi", 2], ["deadline", 2], ["budget", 3], ["timeline", 3], ["planning", 2], ["priorit", 2], ["multitask", 3], ["workstreams", 3], ["calendar", 2]],
        fr: [["gestion de projet", 4], ["délais", 2], ["calendrier", 2]],
        ar: [["إدارة المشاريع", 4], ["مشاريع", 2], ["تنظيم", 2], ["منظمة", 2], ["مواعيد", 2], ["ميزاني", 3], ["جدول", 2], ["أولويات", 2]],
      },
      answer: {
        en: "Project management is central to Laila's work, and she's Google Project Management certified. At Tzkrti, she manages timelines, budgets and briefs across several workstreams, so deliverables stay on track, on brand and aligned with company priorities. She also keeps shared drives, content calendars and templates organised, so the team always has what it needs.",
        fr: "La gestion de projet est au cœur du travail de Laila, et elle est certifiée Google Project Management. Chez Tzkrti, elle gère les plannings, les budgets et les briefs sur plusieurs chantiers en parallèle, pour que les livrables restent dans les temps, cohérents avec la marque et alignés sur les priorités de l'entreprise. Elle organise aussi les espaces partagés, les calendriers éditoriaux et les modèles de documents, pour que l'équipe trouve toujours ce dont elle a besoin.",
        ar: "إدارة المشاريع في صميم عمل ليلى، وهي حاصلة على شهادة جوجل في إدارة المشاريع. في تذكرتي، تدير الجداول الزمنية والميزانيات وملخصات العمل عبر مسارات متعددة، لضمان تسليم المهام في موعدها وبما يتوافق مع هوية العلامة وأولويات الشركة. كما تنظّم الملفات المشتركة وتقويمات المحتوى والقوالب لتكون في متناول الفريق دائماً.",
      },
    },
    {
      id: "stakeholders",
      keys: {
        en: [["agenc", 3], ["stakeholder", 3], ["vendor", 3], ["coordinat", 2], ["collaborat", 2], ["cross functional", 3], ["teamwork", 2], ["work with", 1], ["ceo", 2], ["executive", 2]],
        fr: [["parties prenantes", 3], ["prestataire", 3], ["coordon", 2], ["collabor", 2]],
        ar: [["وكال", 3], ["أصحاب المصلحة", 3], ["تنسيق", 2], ["تعاون", 2], ["الرئيس التنفيذي", 2]],
      },
      answer: {
        en: "Coordinating people is one of Laila's strengths. At Tzkrti, she's the main contact and quality reviewer for a designer, a marketing consultant and an SEO agency, and she reports directly to the CEO. At Ledvance, she briefed creative and PR agencies, managed approval workflows, and connected the sustainability team with the brand function.",
        fr: "La coordination est l'un des points forts de Laila. Chez Tzkrti, elle est l'interlocutrice principale et la garante de la qualité pour un designer, un consultant marketing et une agence SEO, et elle rend compte directement au CEO. Chez Ledvance, elle briefait les agences créatives et RP, gérait les circuits de validation, et faisait le lien entre l'équipe développement durable et la marque.",
        ar: "التنسيق من أبرز نقاط قوة ليلى. في تذكرتي، هي جهة الاتصال الرئيسية والمسؤولة عن مراجعة الجودة مع مصمم ومستشار تسويق ووكالة لتحسين محركات البحث، وترفع تقاريرها مباشرة إلى الرئيس التنفيذي. وفي ليدفانس، كانت تُعدّ الملخصات للوكالات الإبداعية ووكالات العلاقات العامة، وتدير مسارات الموافقة، وتربط بين فريق الاستدامة وإدارة العلامة التجارية.",
      },
    },
    {
      id: "leadership",
      keys: {
        en: [["lead", 2], ["leadership", 3], ["mentor", 4], ["manage people", 4], ["team size", 3], ["direct reports", 4], ["managed a team", 4], ["junior", 2]],
        fr: [["encadr", 4], ["diriger", 3], ["équipe", 1]],
        ar: [["قيادة", 3], ["توجيه", 3], ["إشراف", 3], ["فريق", 1]],
      },
      answer: {
        en: "At Accenture, Laila mentored three to five junior analysts. Today she leads day-to-day work with a designer, a marketing consultant and an SEO agency, setting direction and reviewing their output. She's comfortable owning a function on her own, as she does at Tzkrti, and working closely with senior leadership.",
        fr: "Chez Accenture, Laila a encadré trois à cinq analystes juniors. Aujourd'hui, elle dirige au quotidien le travail d'un designer, d'un consultant marketing et d'une agence SEO, en donnant le cap et en validant les livrables. Elle est à l'aise pour porter seule une fonction, comme chez Tzkrti, et pour travailler étroitement avec la direction.",
        ar: "في أكسنتشر، أشرفت ليلى على توجيه ثلاثة إلى خمسة محللين مبتدئين. واليوم تقود العمل اليومي مع مصمم ومستشار تسويق ووكالة لتحسين محركات البحث، فتحدد الاتجاه وتراجع النتائج. وهي معتادة على تولّي وظيفة كاملة بمفردها، كما في تذكرتي، وعلى العمل عن قرب مع القيادة العليا.",
      },
    },
    {
      id: "writing",
      keys: {
        en: [["writ", 2], ["copywrit", 4], ["editing", 3], ["editor", 3], ["copy", 2], ["storytelling", 3], ["press materials", 3]],
        fr: [["rédaction", 4], ["rédiger", 3], ["écriture", 3], ["rédactrice", 3]],
        ar: [["كتابة", 3], ["تحرير", 3], ["صياغة", 3]],
      },
      answer: {
        en: "Writing is at the core of what Laila does. She trained in journalism and started as a copywriter and editor at Radio Free Europe slash Radio Liberty. Today she drafts and reviews press materials, newsletters and promotional copy before they go out.",
        fr: "L'écriture est au cœur du métier de Laila. Formée au journalisme, elle a débuté comme rédactrice et éditrice à Radio Free Europe, Radio Liberty. Aujourd'hui, elle rédige et relit les supports presse, les newsletters et les textes promotionnels avant leur diffusion.",
        ar: "الكتابة في صميم عمل ليلى. فقد درست الصحافة، وبدأت مسيرتها كاتبة ومحررة في إذاعة أوروبا الحرة، راديو ليبرتي. واليوم تكتب وتراجع المواد الصحفية والنشرات الإخبارية والنصوص الترويجية قبل نشرها.",
      },
    },
    {
      id: "sustainability",
      keys: {
        en: [["sustainab", 4], ["esg", 4], ["csr", 4], ["environment", 2]],
        fr: [["développement durable", 4], ["durab", 4], ["rse", 4]],
        ar: [["استدامة", 4], ["بيئة", 2]],
      },
      answer: {
        en: "At Ledvance, Laila coordinated sustainability communications projects. She managed the flow of information and materials between the sustainability team and the brand function.",
        fr: "Chez Ledvance, Laila a coordonné des projets de communication liés au développement durable, en gérant les échanges d'informations et de contenus entre l'équipe développement durable et la marque.",
        ar: "في ليدفانس، نسّقت ليلى مشاريع الاتصال المتعلقة بالاستدامة، وأدارت تدفق المعلومات والمواد بين فريق الاستدامة وإدارة العلامة التجارية.",
      },
    },
    {
      id: "international",
      keys: {
        en: [["international", 3], ["global", 2], ["multicultural", 4], ["countries", 2], ["abroad", 2], ["cultur", 2], ["markets", 2]],
        fr: [["multiculturel", 4], ["pays", 2], ["étranger", 2], ["marchés", 2]],
        ar: [["دولي", 3], ["عالمي", 2], ["ثقافات", 3], ["بلدان", 2], ["أسواق", 2]],
      },
      answer: {
        en: "Laila's whole career has been international. She has worked in the Czech Republic and France, handled multi-market B2B and B2C communications at Ledvance, and reported to global leadership at Accenture. She's bilingual in English and Arabic, speaks French, and is used to working across cultures and time zones.",
        fr: "Tout le parcours de Laila est international. Elle a travaillé en République tchèque et en France, géré une communication multi-marchés B2B et B2C chez Ledvance, et travaillé pour la direction mondiale chez Accenture. Bilingue anglais et arabe, elle parle aussi français et a l'habitude de travailler entre cultures et fuseaux horaires.",
        ar: "مسيرة ليلى كلها دولية. عملت في جمهورية التشيك وفرنسا، وأدارت الاتصال في أسواق متعددة للشركات والمستهلكين في ليدفانس، وقدّمت تقاريرها للقيادة العالمية في أكسنتشر. وهي تتقن العربية والإنجليزية وتتحدث الفرنسية، ومعتادة على العمل بين ثقافات ومناطق زمنية مختلفة.",
      },
    },
    {
      id: "languages",
      keys: {
        en: [["language", 4], ["speak", 2], ["french", 3], ["arabic", 3], ["english", 3], ["bilingual", 4], ["fluent", 3]],
        fr: [["langue", 4], ["parle t", 2], ["elle parle", 2], ["français", 3], ["arabe", 3], ["anglais", 3], ["bilingue", 4], ["couramment", 3]],
        ar: [["لغات", 4], ["لغة", 4], ["تتحدث", 2], ["تتكلم", 2], ["عربي", 3], ["إنجليزي", 3], ["فرنسي", 3]],
      },
      answer: {
        en: "Laila is bilingual in English and Arabic. She also speaks French at an intermediate B2 level, which she uses day to day living in Paris.",
        fr: "Laila est bilingue anglais et arabe. Elle parle aussi français à un niveau intermédiaire B2, qu'elle pratique au quotidien à Paris.",
        ar: "ليلى تتقن العربية والإنجليزية بطلاقة تامة، وتتحدث الفرنسية بمستوى متوسط B2 تمارسه يومياً في باريس.",
      },
    },
    {
      id: "education",
      keys: {
        en: [["education", 4], ["degree", 4], ["university", 4], ["studied", 3], ["study", 2], ["teesside", 4], ["bachelor", 4], ["ba", 2], ["graduat", 3], ["school", 2]],
        fr: [["formation", 3], ["diplôme", 4], ["université", 4], ["études", 3], ["licence", 4], ["école", 2]],
        ar: [["تعليم", 4], ["دراس", 3], ["جامعة", 4], ["جامعي", 4], ["بكالوريوس", 4], ["تخرج", 3], ["مؤهل", 2]],
      },
      answer: {
        en: "Laila has a BA in Creative Media Production with a journalism major from Teesside University, completed in June 2020 on the UK and Czech programme.",
        fr: "Laila est titulaire d'un BA en Creative Media Production, avec une majeure en journalisme, obtenu en juin 2020 à l'université de Teesside, dans le cadre de son programme entre le Royaume-Uni et la République tchèque.",
        ar: "تحمل ليلى بكالوريوس في إنتاج الوسائط الإبداعية بتخصص رئيسي في الصحافة من جامعة تيسايد، ضمن برنامجها في المملكة المتحدة وجمهورية التشيك، وتخرجت في يونيو 2020.",
      },
    },
    {
      id: "certs",
      keys: {
        en: [["certif", 4], ["course", 3], ["training", 2], ["qualification", 3]],
        fr: [["certif", 4]],
        ar: [["شهاد", 4], ["دورات", 3], ["دورة تدريبية", 3]],
      },
      answer: {
        en: "Laila holds several certifications: Google Project Management, Google Analytics, HubSpot SEO, Meltwater Reporting and Dashboards, and Introduction to Generative AI from Accenture.",
        fr: "Laila détient plusieurs certifications : Google Project Management, Google Analytics, HubSpot SEO, Meltwater Reporting and Dashboards, et Introduction à l'IA générative d'Accenture.",
        ar: "تحمل ليلى عدة شهادات مهنية: إدارة المشاريع من جوجل، وجوجل أناليتكس، وتحسين محركات البحث من هب سبوت، وإعداد التقارير ولوحات المتابعة من ميلتووتر، ومقدمة في الذكاء الاصطناعي التوليدي من أكسنتشر.",
      },
    },
    {
      id: "location",
      keys: {
        en: [["where", 2], ["based", 3], ["location", 4], ["live", 2], ["paris", 3], ["france", 2], ["visa", 4], ["permit", 4], ["authori", 4], ["relocat", 3], ["remote", 3], ["hybrid", 3], ["on site", 3], ["onsite", 3], ["office", 2]],
        fr: [["où est", 3], ["où vit", 3], ["basée", 3], ["localis", 3], ["habite", 2], ["titre de séjour", 4], ["autoris", 4], ["déménag", 3], ["mobilité", 3], ["télétravail", 3], ["distance", 2], ["bureau", 2]],
        ar: [["أين", 2], ["تقيم", 3], ["مقيمة", 3], ["موقع", 2], ["باريس", 3], ["فرنسا", 2], ["تأشيرة", 4], ["فيزا", 4], ["تصريح", 4], ["انتقال", 3], ["عن بعد", 3], ["مكتب", 2]],
      },
      answer: {
        en: "Laila is based in Paris and is authorised to work in France. She currently works remotely, and she has worked from offices in Prague. For questions about relocation or a specific working arrangement, she'd be happy to discuss them directly.",
        fr: "Laila est basée à Paris et autorisée à travailler en France. Elle travaille actuellement à distance, et a déjà travaillé en bureau à Prague. Pour toute question de mobilité ou d'organisation du travail, elle sera ravie d'en discuter directement.",
        ar: "تقيم ليلى في باريس ولديها تصريح بالعمل في فرنسا. تعمل حالياً عن بُعد، وسبق لها العمل من المكاتب في براغ. وبالنسبة لأسئلة الانتقال أو ترتيبات العمل، يسعدها مناقشتها معك مباشرة.",
      },
    },
    {
      id: "fit",
      keys: {
        en: [["why should", 4], ["why hire", 4], ["hire her", 4], ["fit", 3], ["good candidate", 4], ["strength", 3], ["stand out", 3], ["unique", 3], ["value", 2], ["bring", 2], ["right person", 4], ["qualified", 3], ["suitable", 3]],
        fr: [["pourquoi", 2], ["embaucher", 4], ["recruter", 4], ["adapté", 3], ["correspond", 3], ["point fort", 3], ["points forts", 3], ["valeur", 2], ["apporter", 2], ["bonne candidate", 4], ["qualifiée", 3]],
        ar: [["لماذا", 2], ["نوظف", 4], ["توظيف", 3], ["مناسبة", 3], ["ملائمة", 3], ["نقاط القوة", 3], ["تميز", 3], ["تضيف", 2], ["قيمة", 2], ["مرشحة", 3]],
      },
      answer: {
        en: "Laila brings an unusual mix. She thinks strategically, delivers hands-on, and is rigorous about data. She can run a communications function end to end on her own, as she does at Tzkrti, and she has also worked inside large global organisations like Ledvance and Accenture. Her results speak for themselves: more than 400 percent audience growth, over 280 applications from one launch, and a number one search ranking in two months. Add three languages and a journalism background, and she can step into a role and add value quickly.",
        fr: "Laila réunit un mélange rare : une vision stratégique, une exécution très concrète et une vraie rigueur sur les données. Elle sait porter seule une fonction communication de bout en bout, comme chez Tzkrti, et elle a aussi évolué dans de grands groupes internationaux comme Ledvance et Accenture. Ses résultats parlent d'eux-mêmes : plus de 400 % de croissance d'audience, plus de 280 candidatures en un seul lancement, et la première place en recherche de marque en deux mois. Avec trois langues et une formation de journaliste, elle est rapidement opérationnelle.",
        ar: "تجمع ليلى مزيجاً نادراً من التفكير الاستراتيجي والتنفيذ العملي والدقة في التعامل مع البيانات. فهي قادرة على إدارة وظيفة الاتصال بالكامل بمفردها، كما تفعل في تذكرتي، وعملت أيضاً داخل مؤسسات عالمية كبرى مثل ليدفانس وأكسنتشر. ونتائجها تتحدث عنها: نمو الجمهور بأكثر من 400 بالمئة، وأكثر من 280 طلب توظيف من إطلاق واحد، والمركز الأول في البحث خلال شهرين. ومع ثلاث لغات وخلفية صحفية، تستطيع أن تضيف قيمة بسرعة.",
      },
    },
    {
      id: "weakness",
      keys: {
        en: [["weakness", 4], ["improve", 2], ["challenge", 2], ["difficult", 2], ["mistake", 3], ["failure", 3]],
        fr: [["faiblesse", 4], ["défaut", 3], ["échec", 3], ["erreur", 3], ["améliorer", 2]],
        ar: [["ضعف", 4], ["عيوب", 3], ["تحدي", 2], ["صعوب", 2], ["خطأ", 3], ["فشل", 3]],
      },
      answer: {
        en: "That's a great interview question, and one Laila would rather answer in person, so you get a real and thoughtful answer. You can reach her by email at laila dot zohdy ninety-eight at gmail dot com.",
        fr: "C'est une excellente question d'entretien, à laquelle Laila préfère répondre en personne pour vous donner une réponse sincère et réfléchie. Vous pouvez lui écrire à l'adresse e-mail indiquée en bas de cette page.",
        ar: "هذا سؤال مقابلة ممتاز، وتفضّل ليلى الإجابة عنه شخصياً لتمنحك إجابة صادقة ومدروسة. يمكنك التواصل معها عبر البريد الإلكتروني الموجود أسفل هذه الصفحة.",
      },
    },
    {
      id: "logistics",
      keys: {
        en: [["salary", 5], ["pay", 3], ["compensation", 5], ["rate", 2], ["expectation", 3], ["notice", 4], ["available", 3], ["availability", 4], ["start date", 5], ["when can she start", 5], ["freelance", 3], ["full time", 3], ["part time", 3], ["contract", 2]],
        fr: [["salaire", 5], ["rémunération", 5], ["prétentions", 5], ["préavis", 4], ["disponib", 4], ["date de début", 5], ["commencer", 4], ["cdi", 3], ["cdd", 3], ["temps plein", 3], ["temps partiel", 3], ["contrat", 2]],
        ar: [["راتب", 5], ["رواتب", 5], ["تعويضات", 4], ["إشعار", 4], ["متاحة", 3], ["متى يمكنها", 5], ["البدء", 3], ["تبدأ", 3], ["دوام", 3], ["عقد", 2], ["فريلانس", 3]],
      },
      answer: {
        en: "Salary expectations, availability and contract details are best discussed with Laila directly. Please email her at laila dot zohdy ninety-eight at gmail dot com, and she'll get back to you.",
        fr: "Les prétentions salariales, la disponibilité et les détails contractuels se discutent directement avec Laila. Écrivez-lui à l'adresse e-mail indiquée en bas de cette page, elle vous répondra rapidement.",
        ar: "يُفضّل مناقشة الراتب المتوقع وموعد الانضمام وتفاصيل العقد مع ليلى مباشرة. راسلها عبر البريد الإلكتروني الموجود أسفل هذه الصفحة، وستردّ عليك قريباً.",
      },
    },
    {
      id: "contact",
      keys: {
        en: [["contact", 5], ["email", 5], ["reach", 4], ["get in touch", 5], ["phone", 4], ["interview", 3], ["call", 2], ["meet", 2], ["cv", 2], ["resume", 2], ["portfolio", 3]],
        fr: [["mail", 4], ["joindre", 4], ["téléphone", 4], ["entretien", 3], ["appeler", 3], ["rencontrer", 2]],
        ar: [["التواصل معها", 5], ["أتواصل", 5], ["تواصل", 3], ["بريد", 4], ["إيميل", 5], ["هاتف", 4], ["مقابلة", 3], ["اتصال", 3], ["سيرة", 2], ["تحميل", 2]],
      },
      answer: {
        en: "The best way to reach Laila is by email, at laila dot zohdy ninety-eight at gmail dot com. You'll also find her LinkedIn, her portfolio, and a download link for her full CV at the top of this page.",
        fr: "Le plus simple est de contacter Laila par e-mail, à l'adresse indiquée en bas de cette page. Vous trouverez aussi en haut de la page son LinkedIn, son portfolio et son CV complet à télécharger.",
        ar: "أفضل طريقة للتواصل مع ليلى هي البريد الإلكتروني الموجود أسفل هذه الصفحة. كما ستجد في أعلى الصفحة روابط حسابها على لينكدإن وأعمالها وسيرتها الذاتية الكاملة للتحميل.",
      },
    },
  ],
};
