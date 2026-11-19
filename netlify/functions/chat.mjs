// Netlify function → POST /api/chat
import { handleChat } from "../../lib/chat.js";

export default handleChat;
export const config = { path: "/api/chat" };
