(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const card = $("assistant");
  const orb = $("orb");
  const statusEl = $("status");
  const transcript = $("transcript");
  const chipsEl = $("chips");
  const form = $("ask-form");
  const input = $("ask-input");
  const muteBtn = $("mute");
  $("year").textContent = new Date().getFullYear();

  const KB = window.KNOWLEDGE;

  // ───────── Interface text per language ─────────
  const UI = {
    en: {
      dir: "ltr", speech: "en-US", eyebrow: "Talk to my resume", title: "Ask my assistant",
      idle: "Tap to ask a question", listening: "Listening…", thinking: "Thinking…", speaking: "Speaking — tap to stop",
      placeholder: "Type a question…", send: "Send", mute: "Mute voice replies", unmute: "Unmute voice replies",
      fine: "Answers are drawn from Laila's CV. For anything else, she'd love to hear from you directly.",
      micBlocked: "Microphone access was blocked — you can type your question instead.",
      noSpeech: "I didn't hear anything. Tap to try again.",
      stopped: "Voice input stopped. Tap to try again.",
      noSR: "Type a question below, or use Chrome, Edge or Safari to talk.",
      noVoice: "No English voice on this device — the answer is shown above.",
      aria: { idle: "Start talking", listening: "Stop listening", thinking: "Thinking", speaking: "Stop speaking" },
      chips: ["Tell me about Laila in 30 seconds", "What PR and media experience does she have?", "What are her biggest achievements?", "Which languages does she speak?"],
    },
    fr: {
      dir: "ltr", speech: "fr-FR", eyebrow: "Parlez à mon CV", title: "Posez votre question",
      idle: "Touchez pour poser une question", listening: "Je vous écoute…", thinking: "Je réfléchis…", speaking: "Je parle — touchez pour arrêter",
      placeholder: "Écrivez votre question…", send: "Envoyer", mute: "Couper la voix", unmute: "Réactiver la voix",
      fine: "Les réponses proviennent du CV de Laila. Pour toute autre question, elle sera ravie d'échanger avec vous.",
      micBlocked: "L'accès au micro est bloqué — vous pouvez écrire votre question.",
      noSpeech: "Je n'ai rien entendu. Touchez pour réessayer.",
      stopped: "La saisie vocale s'est arrêtée. Touchez pour réessayer.",
      noSR: "Écrivez votre question ci-dessous, ou utilisez Chrome, Edge ou Safari pour parler.",
      noVoice: "Aucune voix française sur cet appareil — la réponse est affichée ci-dessus.",
      aria: { idle: "Commencer à parler", listening: "Arrêter l'écoute", thinking: "Réflexion", speaking: "Arrêter la lecture" },
      chips: ["Présentez Laila en 30 secondes", "Quelle est son expérience en relations presse ?", "Quelles sont ses plus belles réussites ?", "Quelles langues parle-t-elle ?"],
    },
    ar: {
      dir: "rtl", speech: "ar-SA", eyebrow: "تحدّث مع سيرتي الذاتية", title: "اسأل مساعدتي",
      idle: "اضغط لطرح سؤال", listening: "أستمع إليك…", thinking: "لحظة من فضلك…", speaking: "أتحدث الآن — اضغط للإيقاف",
      placeholder: "اكتب سؤالك…", send: "إرسال", mute: "كتم الصوت", unmute: "تشغيل الصوت",
      fine: "الإجابات مستمدة من السيرة الذاتية لليلى. ولأي استفسار آخر، يسعدها تواصلك المباشر معها.",
      micBlocked: "تم حظر الوصول إلى الميكروفون — يمكنك كتابة سؤالك بدلاً من ذلك.",
      noSpeech: "لم أسمع شيئاً. اضغط للمحاولة مرة أخرى.",
      stopped: "توقف الإدخال الصوتي. اضغط للمحاولة مرة أخرى.",
      noSR: "اكتب سؤالك في الأسفل، أو استخدم كروم أو إيدج أو سفاري للتحدث.",
      noVoice: "لا يتوفر صوت عربي على هذا الجهاز — الإجابة معروضة أعلاه.",
      aria: { idle: "ابدأ التحدث", listening: "إيقاف الاستماع", thinking: "جارٍ التفكير", speaking: "إيقاف الصوت" },
      chips: ["عرّفني بليلى في 30 ثانية", "ما خبرتها في العلاقات العامة والإعلام؟", "ما أبرز إنجازاتها؟", "ما اللغات التي تتحدثها؟"],
    },
  };

  let lang = "en";
  let state = "idle"; // idle | listening | thinking | speaking
  let muted = false;
  const t = () => UI[lang];

  // ───────── UI helpers ─────────
  function setState(next, text) {
    state = next;
    orb.className = "orb " + (next === "idle" ? "" : next);
    orb.setAttribute("aria-label", t().aria[next]);
    statusEl.textContent = text ?? t()[next];
    form.querySelector("button").disabled = next === "thinking";
  }

  function addMsg(role, text, extra = "") {
    const el = document.createElement("div");
    el.className = `msg ${role} ${extra}`.trim();
    el.textContent = text;
    transcript.appendChild(el);
    transcript.scrollTop = transcript.scrollHeight;
    return el;
  }

  // ───────── Matching (runs entirely in the browser) ─────────
  // Ignores case, accents, Arabic diacritics and letter variants.
  function norm(s) {
    return (" " + s + " ")
      .toLowerCase()
      .replace(/\bj['’]ai\b/g, "jai") // French "j'ai" must not read as "ai"
      .normalize("NFD")
      .replace(/\p{M}/gu, "")
      .replace(/[أإآٱ]/g, "ا")
      .replace(/ة/g, "ه")
      .replace(/ى/g, "ي")
      .replace(/ـ/g, "")
      .replace(/[^\p{L}\p{N}#+ ]+/gu, " ")
      .replace(/\s+/g, " ");
  }
  const isArabic = (s) => /[؀-ۿ]/.test(s);
  const GENERIC = new Set(["hello", "thanks", "intro"]); // only win when nothing specific matches

  // Pre-process every topic's keys from all languages once.
  // Keys that normalize to the same word (e.g. "experience" / "expérience") count once.
  const TOPICS = KB.topics.map((topic) => {
    const byKey = new Map();
    for (const [raw, weight = 1] of Object.values(topic.keys).flat()) {
      const exact = raw.startsWith("=");
      const key = norm(exact ? raw.slice(1) : raw).trim();
      const id = (exact ? "=" : "") + key;
      if (!byKey.has(id) || byKey.get(id).weight < weight)
        byKey.set(id, { key, weight, exact, arabic: isArabic(key), phrase: key.includes(" ") });
    }
    return { topic, keys: [...byKey.values()] };
  });

  function score(keys, text, tokens) {
    let total = 0;
    for (const k of keys) {
      let hit;
      if (k.arabic) hit = text.includes(k.key);
      else if (k.phrase) hit = text.includes(" " + k.key);
      else if (k.exact || k.key.length < 4) hit = tokens.includes(k.key);
      else hit = tokens.some((w) => w.startsWith(k.key));
      if (hit) total += k.weight;
    }
    return total;
  }

  function findAnswer(question) {
    const text = norm(question);
    const tokens = text.trim().split(" ");
    let best = null, bestScore = 0, generic = null, genericScore = 0;
    for (const { topic, keys } of TOPICS) {
      const s = score(keys, text, tokens);
      if (GENERIC.has(topic.id)) {
        if (s > genericScore) { generic = topic; genericScore = s; }
      } else if (s > bestScore) { best = topic; bestScore = s; }
    }
    const pick = bestScore >= 2 ? best : genericScore >= 2 ? generic : null;
    return pick ? pick.answer[lang] : KB.fallback[lang];
  }

  // ───────── Speech output (browser's built-in voices, free) ─────────
  // Preferred female voices per language, most natural first.
  const FEMALE = {
    en: [
      /Microsoft (Sonia|Libby|Aria|Jenny|Emma|Ava|Michelle).*Natural/i,
      /(Serena|Samantha|Kate|Stephanie|Karen|Moira|Tessa|Fiona|Ava|Allison|Susan|Zoe).*\((Premium|Enhanced)\)/i,
      /Microsoft (Sonia|Libby|Aria|Jenny|Emma|Ava|Michelle)/i,
      /Google UK English Female/i,
      /Serena|Samantha|Kate|Karen|Moira|Tessa|Victoria|Fiona|Ava|Allison/i,
      /Microsoft (Zira|Hazel|Susan)/i, /Google US English/i, /female/i,
    ],
    fr: [
      /Microsoft (Denise|Eloise|Vivienne|Brigitte|Coralie|Jacqueline|Josephine|Yvette|Celeste|Sylvie|Ariane).*Natural/i,
      /(Audrey|Am[ée]lie|Marie|Aur[ée]lie|Virginie|Julie|Chantal|Sandy|Flo|Shelley).*\((Premium|Enhanced)\)/i,
      /Microsoft (Denise|Eloise|Hortense|Julie|Caroline|Sylvie|Vivienne|Ariane)/i,
      /Google fran[çc]ais/i,
      /Audrey|Am[ée]lie|Marie|Aur[ée]lie|Virginie|Julie|Sandy|Flo|Shelley/i, /female|femme/i,
    ],
    ar: [
      /Microsoft (Salma|Zariyah|Fatima|Amina|Laila|Iman|Rana|Mouna|Reem|Sana|Noura|Amany|Hoda|Layla|Aisha|Mona).*Natural/i,
      /Microsoft (Salma|Zariyah|Fatima|Amina|Laila|Iman|Rana|Mouna|Reem|Sana|Noura|Amany|Hoda|Layla|Aisha|Mona)/i,
      /\b(Hoda|Mona|Lana|Mariam|Salma|Zariyah|Laila|Amira|Tarik?a|Nora)\b/i, /female|أنثى/i,
    ],
  };
  const MALE = /\b(Majed|Maged|Naayf|Hamed|Shakir|Omar|Tarik|Hamdan|Bassel|Taim|Jamal|Moaz|Rami|Saif|Laith|Ali|Thomas|Henri|Paul|Jacques|Remy|R[ée]my|Antoine|J[ée]r[ôo]me|Alain|G[ée]rard|Fabrice|Guillaume|Jean|Daniel|Fred|Ralph|Alex|Tom|Oliver|Aaron|Arthur|Gordon|Lee|Rishi|Ryan|Guy|Eric|Christopher|Andrew|Brian|Davis|Roger|Liam|Male)\b/i;

  const voiceFor = {};
  function pickVoices() {
    const voices = window.speechSynthesis ? speechSynthesis.getVoices() : [];
    for (const code of Object.keys(UI)) {
      const pool = voices.filter((v) => v.lang.replace("_", "-").toLowerCase().startsWith(code));
      let found = null;
      for (const re of FEMALE[code]) if ((found = pool.find((v) => re.test(v.name)))) break;
      voiceFor[code] = found || pool.find((v) => !MALE.test(v.name)) || pool[0] || null;
    }
  }
  if (window.speechSynthesis) {
    pickVoices();
    speechSynthesis.onvoiceschanged = pickVoices;
  }

  function stopSpeaking() {
    if (window.speechSynthesis) speechSynthesis.cancel();
  }

  function speakWithBrowser(text, voice) {
    return new Promise((resolve) => {
      // Chrome cuts long utterances, so speak sentence by sentence.
      const parts = text.match(/[^.!?؟]+[.!?؟]*\s*/g) || [text];
      let i = 0;
      const next = () => {
        if (i >= parts.length || state !== "speaking") return resolve();
        const u = new SpeechSynthesisUtterance(parts[i++].trim());
        u.voice = voice;
        u.lang = voice.lang;
        u.rate = lang === "ar" ? 0.95 : 0.98;
        u.pitch = 1.04;
        u.onend = next;
        u.onerror = () => resolve();
        speechSynthesis.speak(u);
      };
      next();
    });
  }

  async function speak(text) {
    if (muted || !window.speechSynthesis) return setState("idle");
    const voice = voiceFor[lang];
    if (!voice) return setState("idle", t().noVoice);
    setState("speaking");
    await speakWithBrowser(text, voice);
    if (state === "speaking") setState("idle");
  }

  // ───────── Ask the assistant ─────────
  async function ask(question) {
    question = question.trim();
    if (!question || state === "thinking") return;
    stopSpeaking();
    addMsg("user", question);
    setState("thinking");
    await new Promise((r) => setTimeout(r, 450 + Math.random() * 350)); // a natural pause
    const reply = findAnswer(question);
    addMsg("assistant", reply);
    await speak(reply);
  }

  // ───────── Speech input ─────────
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = null;
  let interimEl = null;
  let finalText = "";

  if (SR) {
    recognition = new SR();
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (e) => {
      let interim = "";
      finalText = "";
      for (const r of e.results) (r.isFinal ? (finalText += r[0].transcript) : (interim += r[0].transcript));
      const shown = (finalText + " " + interim).trim();
      if (!interimEl) interimEl = addMsg("user", shown, "interim");
      else interimEl.textContent = shown;
      transcript.scrollTop = transcript.scrollHeight;
    };
    recognition.onerror = (e) => {
      const msg =
        e.error === "not-allowed" || e.error === "service-not-allowed" ? t().micBlocked
        : e.error === "no-speech" ? t().noSpeech
        : t().stopped;
      setState("idle", msg);
    };
    recognition.onend = () => {
      if (interimEl) { interimEl.remove(); interimEl = null; }
      const text = finalText.trim();
      finalText = "";
      if (text) ask(text);
      else if (state === "listening") setState("idle");
    };
  }

  function startListening() {
    if (!recognition) {
      setState("idle", t().noSR);
      input.focus();
      return;
    }
    stopSpeaking();
    finalText = "";
    recognition.lang = t().speech;
    try {
      recognition.start();
      setState("listening");
    } catch {
      /* already started */
    }
  }

  // Unlock speech on iOS/Safari during the first user gesture.
  let unlocked = false;
  function unlockAudio() {
    if (unlocked || !window.speechSynthesis) return;
    unlocked = true;
    try { speechSynthesis.speak(new SpeechSynthesisUtterance("")); } catch { /* ignore */ }
  }

  // ───────── Language switching ─────────
  function setLang(next) {
    if (!UI[next]) next = "en";
    lang = next;
    try { localStorage.setItem("lz-lang", next); } catch { /* ignore */ }
    if (recognition && state === "listening") recognition.abort();
    stopSpeaking();

    const u = t();
    card.setAttribute("lang", next);
    card.setAttribute("dir", u.dir);
    $("a-eyebrow").textContent = u.eyebrow;
    $("assistant-title").textContent = u.title;
    $("fineprint").textContent = u.fine;
    input.placeholder = u.placeholder;
    input.setAttribute("aria-label", u.placeholder);
    form.querySelector("button").setAttribute("aria-label", u.send);
    muteBtn.title = muted ? u.unmute : u.mute;
    document.querySelectorAll(".lang button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === next)));

    chipsEl.replaceChildren(...u.chips.map((c) => Object.assign(document.createElement("button"), { textContent: c })));
    transcript.replaceChildren();
    addMsg("assistant", KB.greeting[next]);
    setState("idle", SR ? undefined : u.noSR);
  }

  // ───────── Events ─────────
  orb.addEventListener("click", () => {
    unlockAudio();
    if (state === "listening") recognition && recognition.stop();
    else if (state === "speaking") { stopSpeaking(); setState("idle"); }
    else if (state === "idle") startListening();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    unlockAudio();
    const q = input.value;
    input.value = "";
    ask(q);
  });

  chipsEl.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;
    unlockAudio();
    ask(e.target.textContent);
  });

  document.querySelector(".lang").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-lang]");
    if (b && b.dataset.lang !== lang) setLang(b.dataset.lang);
  });

  muteBtn.addEventListener("click", () => {
    muted = !muted;
    muteBtn.setAttribute("aria-pressed", String(muted));
    muteBtn.title = muted ? t().unmute : t().mute;
    if (muted && state === "speaking") { stopSpeaking(); setState("idle"); }
  });

  // Start in the saved language, else the visitor's browser language.
  let initial = "en";
  try { initial = localStorage.getItem("lz-lang") || ""; } catch { /* ignore */ }
  if (!UI[initial]) initial = (navigator.language || "en").slice(0, 2).toLowerCase();
  setLang(UI[initial] ? initial : "en");
})();
