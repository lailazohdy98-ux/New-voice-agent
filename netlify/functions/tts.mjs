// Netlify function → POST /api/tts
import { handleTts } from "../../lib/tts.js";

export default handleTts;
export const config = { path: "/api/tts" };
