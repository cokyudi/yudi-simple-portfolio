import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { getKnowledge } from '@/lib/knowledge';

export const runtime = 'nodejs';
export const maxDuration = 30;

type ChatMessage = { role: 'user' | 'assistant'; content: string };

// Best-effort in-memory per-IP rate limit. Per-instance only (not global), but
// the free Gemini tier means abuse can't bill — this just protects the quota.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 8;
const MAX_INPUT_CHARS = 1500;
const MAX_TURNS = 8;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const SYSTEM_PROMPT = `You are the assistant on Yudi Dharma Putra's personal portfolio website. Your only job is to answer questions about Yudi — his experience, skills, projects, background, and how to contact him — using ONLY the context below.

Rules:
- Answer strictly from the context. Do not invent facts, dates, employers, or numbers.
- If a question is not about Yudi or is not covered by the context, politely decline and steer back to questions about Yudi's work. Do not act as a general-purpose assistant, write code, or answer off-topic requests.
- Reply in the same language as the user's most recent message (English or Japanese).
- Be concise, warm, and professional. Keep answers to a few sentences unless asked for detail.
- When relevant, point to contacting Yudi by email (cokagungyudi@gmail.com) or LinkedIn.

CONTEXT:
`;

export async function POST(req: Request) {
  const ip = (req.headers.get('x-forwarded-for') ?? 'local').split(',')[0].trim();
  if (isRateLimited(ip)) {
    return Response.json(
      { error: 'Too many requests. Please slow down and try again shortly.' },
      { status: 429 },
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages.slice(-MAX_TURNS) : [];
  const last = messages[messages.length - 1];
  if (!last || last.role !== 'user' || typeof last.content !== 'string' || !last.content.trim()) {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const cleaned = messages
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .map((m) => ({ role: m.role, content: String(m.content).slice(0, MAX_INPUT_CHARS) }));

  try {
    const { text } = await generateText({
      model: google('gemini-2.5-flash'),
      system: SYSTEM_PROMPT + getKnowledge(),
      messages: cleaned,
      maxOutputTokens: 500,
      temperature: 0.3,
    });
    return Response.json({ text });
  } catch {
    return Response.json(
      { error: 'The assistant is unavailable right now. Please try again later.' },
      { status: 502 },
    );
  }
}
