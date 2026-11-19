# Laila Zohdy — Voice Resume

A minimal, pastel, single-page resume with a built-in **voice assistant** in **English, French and Arabic** (switch with the EN · FR · ع buttons). Recruiters tap the orb, ask a question out loud (or type it), and a female voice answers using information from Laila's CV.

It's **100% free**: no API keys, no server, no accounts.

- **Ears:** the browser's built-in speech recognition. It works in Chrome, Edge and Safari; in other browsers, recruiters type instead.
- **Brain:** `public/answers.js`, a set of topics with pre-written answers. The question is matched to the closest topic. If nothing matches, the assistant politely suggests emailing Laila.
- **Voice:** the best female voice the browser has. Microsoft Edge's "Natural" voices and Apple's Premium voices sound the most human.

```
public/index.html   → page content
public/styles.css   → design (colours are at the top)
public/answers.js   → what the assistant knows and says  ← edit this
public/app.js       → voice + matching logic
```

## Editing the assistant

Open `public/answers.js`. Each topic has:

- `keys`: words a recruiter might use, each with a weight.
- `answer`: what the assistant says. Write it as natural spoken sentences.

To add a topic, copy one and change it. Then commit and push, and Vercel redeploys automatically.

## Run locally

```bash
npm run dev
```

Then open http://localhost:3000.

## Deploy on Vercel

1. Go to https://vercel.com/new and import this GitHub repository.
2. Set **Application Preset** to **Other**. Leave every other setting as is: `vercel.json` already serves the `public` folder.
3. Click **Deploy**. No environment variables are needed.

Netlify works too, because `netlify.toml` already sets the publish folder.
