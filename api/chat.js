const ipState = new Map();

const CHAT_RATE_LIMIT_WINDOW_MS = Number(process.env.CHAT_RATE_LIMIT_WINDOW_MS || 60_000);
const CHAT_RATE_LIMIT_MAX_REQUESTS = Number(process.env.CHAT_RATE_LIMIT_MAX_REQUESTS || 12);
const CHAT_MIN_INTERVAL_MS = Number(process.env.CHAT_MIN_INTERVAL_MS || 1_500);
const CHAT_BLOCK_DURATION_MS = Number(process.env.CHAT_BLOCK_DURATION_MS || 300_000);
const CHAT_MAX_INPUT_CHARS = Number(process.env.CHAT_MAX_INPUT_CHARS || 1_200);
const CHAT_MAX_HISTORY_MESSAGES = Number(process.env.CHAT_MAX_HISTORY_MESSAGES || 20);

function getClientIp(req) {
    const xForwardedFor = req.headers['x-forwarded-for'];

    if (typeof xForwardedFor === 'string' && xForwardedFor.trim()) {
        return xForwardedFor.split(',')[0].trim();
    }

    return req.socket?.remoteAddress || 'unknown';
}

function checkRateLimit(clientIp) {
    const now = Date.now();
    const state = ipState.get(clientIp) || {
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
        ipState.set(clientIp, state);
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
        ipState.set(clientIp, state);
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
    ipState.set(clientIp, state);

    if (ipState.size > 5_000) {
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

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { messages, system } = req.body;
        const clientIp = getClientIp(req);
        const apiKey = process.env.GEMINI_API_KEY;
        const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

        const rateLimit = checkRateLimit(clientIp);
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
            return res.status(500).json({ error: 'Missing GEMINI_API_KEY on server' });
        }

        const contents = (messages || []).map((msg) => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: String(msg.content || '') }],
        }));

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${apiKey}`,
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                systemInstruction: {
                    parts: [{ text: String(system || '') }],
                },
                contents,
                generationConfig: {
                    maxOutputTokens: 1024,
                },
            }),
        }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error('Gemini API Error:', data);
            return res.status(response.status).json({ error: data.error?.message || 'Error fetching from Gemini' });
        }

        const reply = (data.candidates || [])
            .flatMap((candidate) => candidate?.content?.parts || [])
            .map((part) => part?.text || '')
            .join('')
            .trim();

        if (!reply) {
            return res.status(502).json({ error: 'Gemini returned an empty response' });
        }

        return res.status(200).json({ reply });
    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
