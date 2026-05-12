const ipState = new Map();

const CHAT_RATE_LIMIT_WINDOW_MS = Number(process.env.CHAT_RATE_LIMIT_WINDOW_MS || 60_000);
const CHAT_RATE_LIMIT_MAX_REQUESTS = Number(process.env.CHAT_RATE_LIMIT_MAX_REQUESTS || 12);
const CHAT_MIN_INTERVAL_MS = Number(process.env.CHAT_MIN_INTERVAL_MS || 1_500);
const CHAT_BLOCK_DURATION_MS = Number(process.env.CHAT_BLOCK_DURATION_MS || 300_000);
const CHAT_MAX_INPUT_CHARS = Number(process.env.CHAT_MAX_INPUT_CHARS || 1_200);
const CHAT_MAX_HISTORY_MESSAGES = Number(process.env.CHAT_MAX_HISTORY_MESSAGES || 20);
const GENERIC_CHAT_ERROR = 'The assistant is temporarily unavailable. Please try again shortly.';
const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const SYSTEM_PROMPT = `
You are the AI Assistant for Skylark Magsilang's personal portfolio. Skylark is a Full Stack Developer based in the Philippines, working for 8MB LLC (Zagged) in Delaware, USA.

KEY INFORMATION:
- Role: Full Stack Developer specializing in automation, AI systems, and scalable web apps.
- Core Stack: JavaScript, TypeScript, Python, SQL, React, Next.js, Node.js, Flask, PostgreSQL, Docker.
- Experience: Automation, AI-powered applications, high-performance web solutions.
- Projects:
  1. Discord Automation Bots: 40,000+ members, 60+ servers, Python/PostgreSQL.
  2. Gemini AI Media Generator: Integrates Gemini 3 Pro with Discord, 1,000+ images/week.
  3. Email Automation System: ~2,000 automated emails daily (~60K/month), 99% uptime, Flask/SMTP, saving ~$300/month.
  4. TikTok Data Scraper: 100+ profiles/min, 5x faster, reduced memory from 1.8GB to 450MB, Python/Selenium.
  5. Google Maps Data Scraper: FastAPI + Playwright scraper with website email/phone extraction and CSV/JSON export.
  6. NEU Library Visitor Log: Next.js 14 + TypeScript system with NEU Google OAuth, role-aware logs, analytics, and Gemini admin assistant.

STYLE:
- Tone: Professional, fast-paced, result-oriented, helpful, and concise.
- Goal: Help recruiters and clients learn about Skylark's skills and schedule a meeting or contact him.
- Call to Action: Encourage them to email skylarkmagsilangsl@gmail.com or check GitHub at github.com/5ky-lark.

CONSTRAINT:
- Keep answers short and relevant (under 3 sentences usually).
- If asked about "young", emphasize "result-oriented" and "production-ready" instead.
- Do NOT make up facts. If unsure, say "I'm not sure, but you can ask Skylark directly."
`;

function getClientIp(req) {
    const xForwardedFor = req.headers['x-forwarded-for'];

    if (typeof xForwardedFor === 'string' && xForwardedFor.trim()) {
        return xForwardedFor.split(',')[0].trim();
    }

    return req.socket?.remoteAddress || 'unknown';
}

function isAllowedOrigin(req) {
    const origin = req.headers.origin;

    if (!origin) {
        return true;
    }

    try {
        const requestHost = req.headers['x-forwarded-host'] || req.headers.host;
        return new URL(origin).host === requestHost;
    } catch {
        return false;
    }
}

async function redisCommand(command) {
    if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) {
        return null;
    }

    const response = await fetch(UPSTASH_REDIS_REST_URL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(command),
    });

    if (!response.ok) {
        throw new Error(`Redis command failed with status ${response.status}`);
    }

    return response.json();
}

async function getRateLimitState(clientIp) {
    const cacheKey = `chat-rate:${clientIp}`;

    if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) {
        return {
            cacheKey,
            state: ipState.get(clientIp),
            durable: false,
        };
    }

    try {
        const data = await redisCommand(['GET', cacheKey]);
        return {
            cacheKey,
            state: data?.result ? JSON.parse(data.result) : undefined,
            durable: true,
        };
    } catch (error) {
        console.error('Rate limit Redis read failed, falling back to memory:', error);
        return {
            cacheKey,
            state: ipState.get(clientIp),
            durable: false,
        };
    }
}

async function saveRateLimitState({ clientIp, cacheKey, state, durable }) {
    if (durable) {
        try {
            await redisCommand(['SET', cacheKey, JSON.stringify(state), 'EX', 30 * 60]);
        } catch (error) {
            console.error('Rate limit Redis write failed, falling back to memory:', error);
            ipState.set(clientIp, state);
        }
        return;
    }

    ipState.set(clientIp, state);
}

async function checkRateLimit(clientIp) {
    const now = Date.now();
    const cache = await getRateLimitState(clientIp);
    const state = cache.state || {
        timestamps: [],
        lastRequestAt: 0,
        blockedUntil: 0,
        strikes: 0,
    };

    if (state.blockedUntil > now) {
        return {
            allowed: false,
            retryAfterMs: state.blockedUntil - now,
            reason: 'blocked',
        };
    }

    if (now - state.lastRequestAt < CHAT_MIN_INTERVAL_MS) {
        state.strikes += 1;
        state.blockedUntil = now + Math.min(CHAT_BLOCK_DURATION_MS, state.strikes * 15_000);
        await saveRateLimitState({ clientIp, ...cache, state });
        return {
            allowed: false,
            retryAfterMs: state.blockedUntil - now,
            reason: 'cooldown',
        };
    }

    const windowStart = now - CHAT_RATE_LIMIT_WINDOW_MS;
    state.timestamps = state.timestamps.filter((timestamp) => timestamp >= windowStart);

    if (state.timestamps.length >= CHAT_RATE_LIMIT_MAX_REQUESTS) {
        state.strikes += 1;
        state.blockedUntil = now + CHAT_BLOCK_DURATION_MS;
        await saveRateLimitState({ clientIp, ...cache, state });
        return {
            allowed: false,
            retryAfterMs: state.blockedUntil - now,
            reason: 'rate',
        };
    }

    state.timestamps.push(now);
    state.lastRequestAt = now;
    state.strikes = Math.max(0, state.strikes - 1);
    state.blockedUntil = 0;
    await saveRateLimitState({ clientIp, ...cache, state });

    if (!cache.durable && ipState.size > 5_000) {
        for (const [key, value] of ipState.entries()) {
            const lastSeen = Math.max(value.lastRequestAt || 0, value.blockedUntil || 0);
            if (now - lastSeen > 30 * 60_000) {
                ipState.delete(key);
            }
        }
    }

    return { allowed: true };
}

function validateMessages(messages) {
    if (!Array.isArray(messages)) {
        return { valid: false, error: 'Invalid messages payload' };
    }

    if (messages.length === 0 || messages.length > CHAT_MAX_HISTORY_MESSAGES) {
        return { valid: false, error: `messages must be 1-${CHAT_MAX_HISTORY_MESSAGES}` };
    }

    for (const msg of messages) {
        const role = String(msg?.role || '');
        const content = String(msg?.content || '');

        if (!['user', 'assistant', 'model'].includes(role)) {
            return { valid: false, error: 'Invalid message role' };
        }

        if (!content.trim() || content.length > CHAT_MAX_INPUT_CHARS) {
            return { valid: false, error: `Message exceeds max length (${CHAT_MAX_INPUT_CHARS}) or is empty` };
        }
    }

    return { valid: true };
}

function extractReply(data) {
    return (data.candidates || [])
        .flatMap((candidate) => candidate?.content?.parts || [])
        .map((part) => part?.text || '')
        .join('')
        .trim();
}

async function generateWithModel({ apiKey, model, contents }) {
    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': apiKey,
            },
            body: JSON.stringify({
                systemInstruction: {
                    parts: [{ text: SYSTEM_PROMPT.trim() }],
                },
                contents,
                generationConfig: {
                    maxOutputTokens: 1024,
                },
            }),
        }
    );

    const data = await response.json();
    return { response, data };
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        if (!isAllowedOrigin(req)) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        const { messages } = req.body;
        const clientIp = getClientIp(req);
        const apiKey = process.env.GEMINI_API_KEY;
        const primaryModel = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
        const fallbackModels = (process.env.GEMINI_FALLBACK_MODELS || 'gemini-2.0-flash,gemini-1.5-flash-latest')
            .split(',')
            .map((model) => model.trim())
            .filter(Boolean);
        const modelCandidates = Array.from(new Set([primaryModel, ...fallbackModels]));

        const rateLimit = await checkRateLimit(clientIp);
        if (!rateLimit.allowed) {
            const retrySeconds = Math.max(1, Math.ceil((rateLimit.retryAfterMs || 1_000) / 1_000));
            res.setHeader('Retry-After', String(retrySeconds));
            return res.status(429).json({ error: `Too many requests. Try again in ${retrySeconds}s.` });
        }

        const validation = validateMessages(messages);
        if (!validation.valid) {
            return res.status(400).json({ error: validation.error });
        }

        if (!apiKey) {
            console.error('Missing GEMINI_API_KEY on server');
            return res.status(500).json({ error: GENERIC_CHAT_ERROR });
        }

        const contents = (messages || []).map((msg) => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: String(msg.content || '') }],
        }));

        let lastError = null;
        let reply = '';

        for (const model of modelCandidates) {
            const { response, data } = await generateWithModel({ apiKey, model, contents });

            if (response.ok) {
                reply = extractReply(data);
                if (reply) {
                    break;
                }

                lastError = { status: 502, message: 'Gemini returned an empty response' };
                continue;
            }

            const message = data?.error?.message || 'Error fetching from Gemini';
            const isModelNotFound = response.status === 404 && /not found|not supported/i.test(message);

            if (isModelNotFound) {
                console.warn(`Gemini model unavailable: ${model}. Trying next fallback model.`);
                lastError = { status: response.status, message };
                continue;
            }

            console.error('Gemini API Error:', data);
            return res.status(502).json({ error: GENERIC_CHAT_ERROR });
        }

        if (!reply) {
            const status = lastError?.status || 502;
            const message = lastError?.message || 'Gemini returned an empty response';
            console.error('Gemini empty response:', { status, message });
            return res.status(502).json({ error: GENERIC_CHAT_ERROR });
        }

        return res.status(200).json({ reply });
    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
