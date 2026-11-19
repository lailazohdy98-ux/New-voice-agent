(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const orb = $("orb");
  const statusEl = $("status");
  const transcript = $("transcript");
  const form = $("ask-form");
  const input = $("ask-input");
  const muteBtn = $("mute");
  $("year").textContent = new Date().getFullYear();

  let state = "idle"; // idle | listening | thinking | speaking
  let muted = false;

  // ───────── UI helpers ─────────
  function setState(next, text) {
    state = next;
    orb.className = "orb " + (next === "idle" ? "" : next);
    orb.setAttribute(
      "aria-label",
      { idle: "Start talking", listening: "Stop listening", thinking: "Thinking", speaking: "Stop speaking" }[next]
    );
    statusEl.textContent =
      text ??
      { idle: "Tap to ask a question", listening: "Listening…", thinking: "Thinking…", speaking: "Speaking — tap to stop" }[next];
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

  // ───────── Find the best answer (runs entirely in the browser) ─────────
  const KB = window.KNOWLEDGE;
  const normalize = (t) =>
    " " +
    t.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9#+\- ]+/g, " ").replace(/\s+/g, " ").trim() +
    " ";

  function score(topic, text, tokens) {
    let total = 0;
    for (const [key, weight = 1] of topic.keys) {
      const hit = key.includes(" ")
        ? text.includes(" " + key)
        : tokens.some((t) => t === key || (key.length >= 4 && t.startsWith(key)));
      if (hit) total += weight;
    }
    return total;
  }

  function findAnswer(question) {
    const text = normalize(question);
    const tokens = text.trim().split(" ");
    const ranked = KB.topics
      .map((topic) => ({ topic, s: score(topic, text, tokens) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s);

    // Greetings / thanks only win on short messages ("hi", "thanks!").
    let best = ranked[0];
    if (best && ["hello", "thanks"].includes(best.topic.id) && tokens.length > 5) {
      best = ranked.find((r) => !["hello", "thanks"].includes(r.topic.id));
    }
    return best && best.s >= 2 ? best.topic.answer : KB.fallback;
  }

  // ───────── Speech output (browser's built-in voice, free) ─────────
  // Most natural-sounding female voices first (Edge "Natural", Apple "Premium/Enhanced", Google).
  const FEMALE_VOICES = [
    /Microsoft (Sonia|Libby|Aria|Jenny|Emma|Ava|Michelle).*Natural/i,
    /(Serena|Samantha|Kate|Stephanie|Karen|Moira|Tessa|Fiona|Ava|Allison|Susan|Zoe).*\((Premium|Enhanced)\)/i,
    /Microsoft (Sonia|Libby|Aria|Jenny|Emma|Ava|Michelle)/i,
    /Google UK English Female/i,
    /Serena/i, /Samantha/i, /Kate/i, /Karen/i, /Moira/i, /Tessa/i, /Victoria/i, /Fiona/i, /Ava/i, /Allison/i,
    /Microsoft (Zira|Hazel|Susan)/i, /Google US English/i, /female/i,
  ];
  let browserVoice = null;
  function pickVoice() {
    const voices = window.speechSynthesis ? speechSynthesis.getVoices() : [];
    const en = voices.filter((v) => /^en/i.test(v.lang));
    for (const re of FEMALE_VOICES) {
      const v = en.find((x) => re.test(x.name));
      if (v) return (browserVoice = v);
    }
    browserVoice = en[0] || voices[0] || null;
  }
  if (window.speechSynthesis) {
    pickVoice();
    speechSynthesis.onvoiceschanged = pickVoice;
  }

  function stopSpeaking() {
    if (window.speechSynthesis) speechSynthesis.cancel();
  }

  function speakWithBrowser(text) {
    return new Promise((resolve) => {
      // Chrome cuts long utterances, so speak sentence by sentence.
      const parts = text.match(/[^.!?]+[.!?]*\s*/g) || [text];
      let i = 0;
      const next = () => {
        if (i >= parts.length || state !== "speaking") return resolve();
        const u = new SpeechSynthesisUtterance(parts[i++].trim());
        if (browserVoice) u.voice = browserVoice;
        u.lang = browserVoice ? browserVoice.lang : "en-GB";
        u.rate = 0.98;
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
    setState("speaking");
    await speakWithBrowser(text);
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
    recognition.lang = "en-US";
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
        e.error === "not-allowed" || e.error === "service-not-allowed"
          ? "Microphone access was blocked — you can type your question instead."
          : e.error === "no-speech"
          ? "I didn't hear anything. Tap to try again."
          : "Voice input stopped. Tap to try again.";
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
      setState("idle", "Voice input isn't supported in this browser — please type your question below.");
      input.focus();
      return;
    }
    stopSpeaking();
    finalText = "";
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

  $("chips").addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;
    unlockAudio();
    ask(e.target.textContent);
  });

  muteBtn.addEventListener("click", () => {
    muted = !muted;
    muteBtn.setAttribute("aria-pressed", String(muted));
    muteBtn.title = muted ? "Unmute voice replies" : "Mute voice replies";
    if (muted && state === "speaking") { stopSpeaking(); setState("idle"); }
  });

  if (!SR) statusEl.textContent = "Type a question below, or use Chrome, Edge or Safari to talk.";
})();
