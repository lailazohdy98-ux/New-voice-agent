// Vercel serverless function → POST /api/tts
import { handleTts } from "../lib/tts.js";

export const maxDuration = 30;
export const POST = handleTts;
