# Laila Zohdy — Voice Resume

A minimal, pastel, single-page resume with a built-in **voice assistant**. Recruiters tap the orb, ask a question out loud (or type it), and a professional female voice answers. Every answer comes only from Laila's CV.

- **Brain:** Claude (Anthropic API). Answers come only from `lib/cv.js`.
- **Ears:** the browser's built-in speech recognition (Chrome, Edge, Safari). Other browsers show a text box instead.
- **Voice:** ElevenLabs, if you set a key, for a natural professional female voice. Without a key, the site uses the best female voice the browser has (for example Samantha, Google UK English Female, or Microsoft Sonia).

```
public/            → the website (index.html, styles.css, app.js, photo, CV PDF)
lib/cv.js          → CV text + assistant instructions  ← edit this to update the agent
lib/chat.js        → calls Claude
lib/tts.js         → optional ElevenLabs voice
api/               → Vercel functions
netlify/functions/ → Netlify functions (same logic)
```

## 1. Before you deploy

1. In `public/index.html`, near the top, replace the two `href="#"` with your **LinkedIn** and **portfolio** URLs.
2. Get an **Anthropic API key** at https://console.anthropic.com (required).
3. Optional, for the best voice: create an **ElevenLabs** account at https://elevenlabs.io and copy your API key. The default voice is "Sarah", a calm, mature female voice. To use a different one, choose it in the Voice Library and set `ELEVENLABS_VOICE_ID`.

## 2. Run it locally (optional)

```bash
npm install
```

```bash
cp .env.example .env
```

Put your keys in `.env`, then:

```bash
npm run dev
```

Open http://localhost:3000.

## 3. Put it on GitHub

Create an empty repository on github.com (for example `voice-resume`), then:

```bash
git remote add origin https://github.com/<your-username>/voice-resume.git
```

```bash
git push -u origin main
```

## 4a. Deploy on Vercel (recommended)

1. Go to https://vercel.com/new and import the GitHub repository.
2. Leave the framework preset as **Other**. Leave the build command empty. The output directory (`public`) comes from `vercel.json`.
3. Under **Environment Variables**, add `ANTHROPIC_API_KEY`. You can also add `ELEVENLABS_API_KEY`.
4. Click **Deploy**.

## 4b. Or deploy on Netlify

1. Go to https://app.netlify.com/start and import the GitHub repository. `netlify.toml` already sets the publish folder and the functions folder.
2. Under **Site configuration → Environment variables**, add `ANTHROPIC_API_KEY`. You can also add `ELEVENLABS_API_KEY`.
3. Deploy. If you added the variables after the first deploy, trigger a redeploy.

## Updating the assistant

Edit `lib/cv.js` and push to GitHub. Vercel or Netlify redeploys automatically. Then check the "Experience" section in `public/index.html` and change it there too, so the page and the assistant say the same thing.

## Environment variables

| Name | Required | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | yes | Claude API key |
| `ELEVENLABS_API_KEY` | no | Premium female voice |
| `ELEVENLABS_VOICE_ID` | no | Picks a different ElevenLabs voice |
| `CLAUDE_MODEL` | no | Overrides the model (default `claude-opus-5-5`) |

## Notes

- Answers are kept short and conversational, and they are written to be spoken aloud.
- If Claude's safety system declines a request, the API automatically retries on a fallback model (`fallbacks: "default"`).
- The API key never reaches the browser. It is only used inside the serverless functions.
- Set a monthly spend limit in the Anthropic Console, and in ElevenLabs, to cap costs.
