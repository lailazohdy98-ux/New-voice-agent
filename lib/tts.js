// Optional premium voice via ElevenLabs.
// If ELEVENLABS_API_KEY is not set, this returns 204 and the browser
// falls back to its built-in female voice (Web Speech API).

// Default: "Sarah" — a soft, mature, professional female voice from the ElevenLabs library.
// Browse https://elevenlabs.io/app/voice-library and set ELEVENLABS_VOICE_ID to change it.
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || "EXAVITQu4vr4xnSDxMaL";
const TTS_MODEL = process.env.ELEVENLABS_MODEL || "eleven_multilingual_v2";

export async function handleTts(request) {
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) return new Response(null, { status: 204 });

  let text = "";
  try {
    ({ text = "" } = await request.json());
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }
  text = String(text).trim().slice(0, 1500);
  if (!text) return new Response("Missing text", { status: 400 });

  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`,
    {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "content-type": "application/json",
        accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: TTS_MODEL,
        voice_settings: { stability: 0.55, similarity_boost: 0.75, style: 0.15, use_speaker_boost: true },
      }),
    }
  );

  if (!res.ok) {
    console.error("ElevenLabs error", res.status, await res.text().catch(() => ""));
    // 204 tells the browser to use its built-in voice instead.
    return new Response(null, { status: 204 });
  }

  return new Response(res.body, {
    status: 200,
    headers: { "content-type": "audio/mpeg", "cache-control": "no-store" },
  });
}
