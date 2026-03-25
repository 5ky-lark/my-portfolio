export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { messages, system } = req.body;

        // Choose provider via env var `LLM_PROVIDER`. Defaults to Anthropic for compatibility.
        const provider = process.env.LLM_PROVIDER || (process.env.GEMINI_API_URL ? 'gemini' : 'anthropic');

        if (provider === 'anthropic') {
            const response = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': process.env.ANTHROPIC_API_KEY,
                    'anthropic-version': '2023-06-01',
                },
                body: JSON.stringify({
                    model: process.env.ANTHROPIC_MODEL || 'claude-3-haiku-20240307',
                    max_tokens: 1024,
                    system: system,
                    messages: messages,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Anthropic API Error:', data);
                return res.status(response.status).json({ error: data.error?.message || 'Error fetching from Anthropic' });
            }

            return res.status(200).json(data);
        }

        // GEMINI provider: forward the request to the configured GEMINI_API_URL.
        if (provider === 'gemini') {
            if (!process.env.GEMINI_API_URL) {
                return res.status(500).json({ error: 'GEMINI_API_URL not configured' });
            }

            // Build headers: prefer Authorization Bearer; if the user uses a different header name,
            // they can set GEMINI_API_KEY_HEADER to the header name (e.g., 'x-api-key').
            const headers = {
                'Content-Type': 'application/json',
            };

            if (process.env.GEMINI_API_KEY) {
                if (process.env.GEMINI_API_KEY_HEADER) {
                    headers[process.env.GEMINI_API_KEY_HEADER] = process.env.GEMINI_API_KEY;
                } else {
                    headers['Authorization'] = `Bearer ${process.env.GEMINI_API_KEY}`;
                }
            }

            // Forward the incoming body so you can control the exact request shape from the client.
            const response = await fetch(process.env.GEMINI_API_URL, {
                method: 'POST',
                headers,
                body: JSON.stringify({ messages, system }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Gemini API Error:', data);
                return res.status(response.status).json({ error: data.error?.message || 'Error fetching from Gemini' });
            }

            return res.status(200).json(data);
        }

        return res.status(400).json({ error: `Unsupported LLM provider: ${provider}` });
    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
