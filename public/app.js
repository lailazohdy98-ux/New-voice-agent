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

  const history = []; // { role: "user" | "assistant", content: string }
  let state = "idle"; // idle | listening | thinking | speaking
  let muted = false;
  let premiumVoice = null; // null = unknown, true = ElevenLabs available, false = use browser voice
  let currentAudio = null;

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

  // ───────── Speech output ─────────
  const FEMALE_VOICES = [
    /Google UK English Female/i, /Microsoft (Sonia|Libby|Aria|Jenny|Emma|Ava|Michelle) Online/i,
    /Samantha/i, /Serena/i, /Karen/i, /Moira/i, /Tessa/i, /Victoria/i, /Fiona/i,
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
    if (currentAudio) { currentAudio.pause(); currentAudio = null; }
    if (window.speechSynthesis) speechSynthesis.cancel();
  }

  function speakWithBrowser(text) {
    return new Promise((resolve) => {
      if (!window.speechSynthesis) return resolve();
      // Chrome cuts long utterances, so speak sentence by sentence.
      const parts = text.match(/[^.!?]+[.!?]*\s*/g) || [text];
      let i = 0;
      const next = () => {
        if (i >= parts.length || state !== "speaking") return resolve();
        const u = new SpeechSynthesisUtterance(parts[i++].trim());
        if (browserVoice) u.voice = browserVoice;
        u.rate = 1;
        u.pitch = 1.05;
        u.onend = next;
        u.onerror = () => resolve();
        speechSynthesis.speak(u);
      };
      next();
    });
  }

  async function speakWithPremium(text) {
    const res = await fetch("/api/tts", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (res.status !== 200) { premiumVoice = false; return false; }
    premiumVoice = true;
    const url = URL.createObjectURL(await res.blob());
    if (state !== "speaking") return true;
    await new Promise((resolve) => {
      const audio = new Audio(url);
      currentAudio = audio;
      audio.onended = audio.onerror = audio.onpause = () => resolve();
      audio.play().catch(() => resolve());
    });
    URL.revokeObjectURL(url);
    return true;
  }

  async function speak(text) {
    if (muted) return setState("idle");
    setState("speaking");
    try {
      let done = false;
      if (premiumVoice !== false) done = await speakWithPremium(text);
      if (!done) await speakWithBrowser(text);
    } catch {
      await speakWithBrowser(text);
    }
    if (state === "speaking") setState("idle");
  }

  // ───────── Ask the assistant ─────────
  async function ask(question) {
    question = question.trim();
    if (!question || state === "thinking") return;
    stopSpeaking();
    history.push({ role: "user", content: question });
    addMsg("user", question);
    setState("thinking");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.reply) throw new Error(data.error || "Something went wrong. Please try again.");
      history.push({ role: "assistant", content: data.reply });
      addMsg("assistant", data.reply);
      await speak(data.reply);
    } catch (err) {
      history.pop(); // drop the unanswered question so the conversation stays valid
      addMsg("assistant", err.message, "error");
      setState("idle");
    }
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

  // Unlock audio playback on iOS/Safari during the first user gesture.
  let unlocked = false;
  function unlockAudio() {
    if (unlocked) return;
    unlocked = true;
    try {
      const a = new Audio("data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAABIADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDA//////////////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAAAAAAAAAAAASDs90hvAAAAAAAAAAAAAAAAAAAA");
      a.play().catch(() => {});
      if (window.speechSynthesis) speechSynthesis.speak(new SpeechSynthesisUtterance(""));
    } catch { /* ignore */ }
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
