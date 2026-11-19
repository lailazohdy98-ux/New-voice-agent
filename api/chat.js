// Vercel serverless function → POST /api/chat
import { handleChat } from "../lib/chat.js";

export const maxDuration = 30;
export const POST = handleChat;
