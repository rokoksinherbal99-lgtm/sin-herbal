import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { SYSTEM_PROMPT, SYSTEM_PROMPT_COMPACT } from '@/lib/systemPrompt';
import { checkCSRF } from '@/lib/api/security';
import {
  searchKnowledge,
  searchKnowledgeTop,
  searchKnowledgeByCategory,
  searchKnowledgePriority,
  detectCategory,
} from '@/lib/chat/matcher';
import { detectFlow, FLOWS } from '@/lib/chat/flows';
import { classifyIntent, intentPrompt, type Intent } from '@/lib/chat/intent';
import type { Flow } from '@/lib/chat/flows';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

interface SessionState {
  flowId?: string;
  stepIndex?: number;
  data?: Record<string, string>;
  lastTopic?: string;
  topicHistory?: string[];
}

function selectModel(message: string, historyLength: number, intent: Intent) {
  if (intent === "greeting" || (message.length < 50 && historyLength < 3)) {
    return { model: 'llama-3.3-70b-versatile', prompt: SYSTEM_PROMPT_COMPACT, maxTokens: 200 };
  }
  return { model: 'llama-3.3-70b-versatile', prompt: SYSTEM_PROMPT, maxTokens: 600 };
}

function buildSmartContext(message: string, intent: Intent, session?: SessionState): string {
  const parts: string[] = [];

  const priority = searchKnowledgePriority(message);
  if (priority.length > 0) {
    parts.push("Paling relevan:");
    parts.push(priority.map((r) => `- ${r.item.question}: ${r.item.answer}`).join("\n"));
  }

  const cat = detectCategory(message);
  if (cat) {
    const catHits = searchKnowledgeByCategory(message, cat, 2);
    if (catHits.length > 0) {
      parts.push(`Kategori ${cat}:`);
      parts.push(catHits.map((r) => `- ${r.item.question}: ${r.item.answer}`).join("\n"));
    }
  }

  const top = searchKnowledgeTop(message, 5);
  const existingIds = new Set(priority.map((r) => r.item.id));
  const extra = top.filter((r) => !existingIds.has(r.item.id));
  if (extra.length > 0) {
    parts.push("Lainnya:");
    parts.push(extra.map((r) => `- ${r.item.question}: ${r.item.answer}`).join("\n"));
  }

  if (session?.lastTopic && session.lastTopic !== intent) {
    parts.push(`(User sebelumnya bertanya tentang: ${session.lastTopic})`);
  }

  return parts.length > 0 ? `Informasi dari toko:\n${parts.join("\n\n")}` : "";
}

const sessions = new Map<string, SessionState>();

const SESSION_TTL = 3600;

let redisClient: any = null;
let redisInitDone = false;

function getRedis() {
  if (redisInitDone) return redisClient;
  redisInitDone = true;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    try {
      const { Redis } = require("@upstash/redis");
      redisClient = new Redis({ url, token });
    } catch {
      console.warn("Redis unavailable for chat sessions, using in-memory fallback");
    }
  }
  return redisClient;
}

async function getSession(sessionId: string): Promise<SessionState | undefined> {
  const redis = getRedis();
  if (redis) {
    try {
      const data = await redis.get(`chat:session:${sessionId}`);
      return data ?? undefined;
    } catch { /* fallback */ }
  }
  return sessions.get(sessionId);
}

async function setSession(sessionId: string, state: SessionState): Promise<void> {
  const redis = getRedis();
  if (redis) {
    try {
      await redis.set(`chat:session:${sessionId}`, state, { ex: SESSION_TTL });
      return;
    } catch { /* fallback */ }
  }
  sessions.set(sessionId, state);
}

async function deleteSession(sessionId: string): Promise<void> {
  const redis = getRedis();
  if (redis) {
    try {
      await redis.del(`chat:session:${sessionId}`);
      return;
    } catch { /* fallback */ }
  }
  sessions.delete(sessionId);
}

const EXACT_MATCHES: { pattern: RegExp; answer: string }[] = [
  { pattern: /dana/i, answer: "Bisa Kak! Kami support DANA, GoPay, OVO, ShopeePay, dan QRIS semua bank. Tinggal pilih metode yang paling nyaman." },
  { pattern: /batang.*bungkus|isi.*bungkus|berapa.*batang/i, answer: "Rokok 12 batang per bungkus Kak. Kopi kemasan 200gr." },
  { pattern: /buka.*minggu|minggu.*buka|jam.*minggu/i, answer: "Minggu 09.00-14.00 Kak. Senin-Sabtu 08.00-17.00." },
  { pattern: /coklat|chocolate/i, answer: "Tidak ada produk Sin Herbal dengan rasa coklat Kak. Varian rokok: kretek herbal (SKT/SKM). Varian kopi: Original dan Mana Kopi (kopi + jahe + madu)." },
  { pattern: /mana.kopi.*madu|madu.*mana.kopi|kopi.*madu/i, answer: "Kopi Mana Kopi mengandung madu Kak. Racikan kopi dengan jahe, madu, adas, kapulaga. Harganya Rp57.600." },
  { pattern: /encode.*rasa|rasa.*encode|encode.*apa/i, answer: "Sin Sinergi Encode (Rp30.000) — SKM dengan formula spesial ekstrak sari buah nanas yang membawa kesegaran unik." },
  { pattern: /krakatau.*luncur|luncur.*krakatau|krakatau.*kapan|kapan.*krakatau/i, answer: "Sin Krakatau diluncurkan 17 Agustus 2018 di Kota Serang. SKT premium terbaik dari semua produk Sin, harga Rp57.500." },
  { pattern: /new.normal.*lahir|lahir.*new.normal|new.normal.*kapan|kapan.*new.normal/i, answer: "Sin New Normal lahir di tengah pandemi Covid-19. Tiga varian: ORG (Rp13.500, SKT), Mind (Rp23.000, SKM), Menthol (Rp27.500, SKM)." },
  { pattern: /paling.*ringan|ringan.*paling|paling.*halus|yang.*light|light.*apa/i, answer: "Yang paling ringan: Sin New Normal ORG (Rp13.500, SKT) atau Sin Sinergi Mind Menthol (Rp15.000, SKM). Cocok buat yang suka rasa ringan dan halus." },
  { pattern: /paling.*kuat|kuat.*paling|yang.*kuat|paling.*nendang/i, answer: "Yang paling kuat rasanya: Sin Krakatau (Rp57.500, SKT premium terbaik). Atau Sin Precision (Rp25.500) pakai tembakau Srintil yang khas." },
  { pattern: /ongkir.*surabaya|surabaya.*ongkir|kirim.*surabaya/i, answer: "Ongkir ke Surabaya mulai Rp15.000. Estimasi 2-4 hari kerja. Gratis ongkir min. belanja Rp100.000." },
  { pattern: /ada.*filter|filter.*ada|produk.*filter/i, answer: "Ada Kak! Sin Platinum Filter (Rp30.500) dan Sin Kujang Mas Filter (Rp24.500). Keduanya SKM dengan filter." },
];

function getExactMatch(message: string): string | null {
  const lower = message.toLowerCase();
  for (const { pattern, answer } of EXACT_MATCHES) {
    if (pattern.test(lower)) return answer;
  }
  return null;
}

function handleFlow(flow: Flow, message: string, state: SessionState): { reply: string; newState: SessionState; complete: boolean } {
  const stepIndex = state.stepIndex ?? 0;

  if (state.data) {
    state.data[`step_${stepIndex - 1}`] = message;
  }

  if (stepIndex >= flow.steps.length) {
    return { reply: flow.completeMessage, newState: {}, complete: true };
  }

  const step = flow.steps[stepIndex];
  let reply = step.question;
  if (step.options) {
    reply += "\n\n" + step.options.map((o) => `• ${o}`).join("\n");
  }

  const newState: SessionState = {
    flowId: flow.id,
    stepIndex: stepIndex + 1,
    data: state.data ?? {},
    lastTopic: state.lastTopic,
    topicHistory: state.topicHistory,
  };

  return { reply, newState, complete: false };
}

export async function POST(req: NextRequest) {
  const csrfRes = checkCSRF(req);
  if (csrfRes) return csrfRes;
  try {
    const { message, conversationHistory = [], sessionId = "default" } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Pesan tidak valid" }, { status: 400 });
    }

    const intent = classifyIntent(message);
    const currentSession = (await getSession(sessionId)) ?? {};
    const context = buildSmartContext(message, intent, currentSession);
    const flow = detectFlow(message);

    const directKB = searchKnowledge(message);
    const directMatch = directKB && directKB.score <= 0.35;
    const exactMatch = getExactMatch(message);

    let reply: string;

    if (intent === "off_topic") {
      reply =
        "Maaf Kak, Sin cuma bisa bantu soal Sin Herbal dan produk herbal Nusantara. 🙏 " +
        "Kalau ada yang ditanyakan seputar produk atau order, Sin siap bantu ya!";
    } else if (flow && !currentSession.flowId) {
      const result = handleFlow(flow, message, { flowId: flow.id, stepIndex: 0, data: {} });
      if (result.complete) {
        reply = result.reply;
      } else {
        const newState = { ...result.newState, lastTopic: intent, topicHistory: [...(currentSession.topicHistory ?? []).slice(-4), intent] };
        await setSession(sessionId, newState);
        reply = result.reply;
      }
    } else if (currentSession.flowId) {
      const existingFlow = FLOWS.find((f) => f.id === currentSession.flowId);
      if (existingFlow) {
        const result = handleFlow(existingFlow, message, currentSession);
        if (result.complete) {
          await deleteSession(sessionId);
        } else {
          const newState = { ...result.newState, lastTopic: intent, topicHistory: [...(currentSession.topicHistory ?? []).slice(-4), intent] };
          await setSession(sessionId, newState);
        }
        reply = result.reply;
      } else {
        await deleteSession(sessionId);
        reply = "Oke, flow selesai. Ada lagi yang bisa Sin bantu?";
      }
    } else if (intent === "greeting") {
      const best = searchKnowledge(message);
      reply = best ? best.item.answer : "Halo Kak! 👋 Ada yang bisa Sin bantu hari ini? Mau tanya produk, order, atau sekadar ngobrol?";
    } else if (!process.env.GROQ_API_KEY) {
      const best = searchKnowledge(message);
      reply = best
        ? best.item.answer
        : "Maaf, Sin sedang offline. Silakan hubungi WA https://wa.me/6285161835757";
    } else {
      const { model, prompt, maxTokens } = selectModel(message, conversationHistory.length, intent);
      const intentHint = intentPrompt(intent);

      if (exactMatch) {
        reply = exactMatch;
      } else if (directMatch) {
        reply = directKB!.item.answer;
      } else {
        const systemContent = context
          ? `${prompt}\n\n${intentHint}\n\n${context}`
          : `${prompt}\n\n${intentHint}`;

        try {
          const completion = await groq.chat.completions.create({
            model,
            messages: [
              { role: "system", content: systemContent },
              ...conversationHistory.slice(-10),
              { role: "user", content: message },
            ],
            max_tokens: maxTokens,
            temperature: 0.7,
            top_p: 0.9,
          });
          reply = completion.choices[0]?.message?.content?.trim() || "";
        } catch (err) {
          console.error("Chat inner error:", err);
          reply = directKB
            ? directKB.item.answer
            : "Mohon maaf, sistem sibuk. Coba lagi atau hubungi WA https://wa.me/6285161835757";
        }
      }
    }

    const newTopicHistory = [...(currentSession.topicHistory ?? []).slice(-4), intent];
    await setSession(sessionId, {
      ...(await getSession(sessionId)),
      lastTopic: intent,
      topicHistory: newTopicHistory,
    });

    return NextResponse.json({ reply, sessionId });
  } catch (err) {
    console.error("Chat outer error:", err);
    return NextResponse.json(
      {
        reply:
          "Mohon maaf, sistem sedang sibuk. Silakan coba lagi, atau hubungi admin di WA ya Kak. 📱 wa.me/6285161835757",
      },
      { status: 500 }
    );
  }
}
